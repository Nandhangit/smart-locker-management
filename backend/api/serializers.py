from rest_framework import serializers
from .models import User, Locker, Reservation


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'role']
        extra_kwargs = {'role': {'required': False}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'role', 'created_at']


class LockerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locker
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    locker = LockerSerializer(read_only=True)
    locker_id = serializers.PrimaryKeyRelatedField(
        queryset=Locker.objects.all(), source='locker', write_only=True
    )

    class Meta:
        model = Reservation
        fields = ['id', 'user', 'locker', 'locker_id', 'reserved_until', 'status', 'created_at']

    def validate(self, data):
        locker = data.get('locker')
        if locker and locker.status != 'available':
            raise serializers.ValidationError("This locker is not available.")
        return data