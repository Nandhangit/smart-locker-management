from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView, LockerViewSet, ReservationViewSet

router = DefaultRouter()
router.register(r'lockers', LockerViewSet, basename='locker')
router.register(r'reservations', ReservationViewSet, basename='reservation')

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('', include(router.urls)),
]