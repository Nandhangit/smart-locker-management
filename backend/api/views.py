from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, Locker, Reservation
from .serializers import RegisterSerializer, UserSerializer, LockerSerializer, ReservationSerializer
from .permissions import IsAdmin, IsAdminOrReadOnly


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        })


class LockerViewSet(viewsets.ModelViewSet):
    queryset = Locker.objects.all()
    serializer_class = LockerSerializer
    permission_classes = [IsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        locker = self.get_object()
        locker.status = 'inactive'
        locker.save()
        return Response({'message': 'Locker deactivated'}, status=status.HTTP_200_OK)


class ReservationViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Reservation.objects.all().select_related('user', 'locker')
        return Reservation.objects.filter(user=user).select_related('user', 'locker')

    def perform_create(self, serializer):
        locker = serializer.validated_data['locker']
        locker.status = 'reserved'
        locker.save()
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['put'], url_path='release')
    def release(self, request, pk=None):
        reservation = self.get_object()
        if reservation.user != request.user and request.user.role != 'admin':
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        if reservation.status == 'released':
            return Response({'error': 'Already released'}, status=status.HTTP_400_BAD_REQUEST)
        reservation.status = 'released'
        reservation.locker.status = 'available'
        reservation.locker.save()
        reservation.save()
        return Response({'message': 'Locker released successfully'})
