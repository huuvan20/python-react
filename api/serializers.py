# serializers.py
from rest_framework import serializers

from .models import HotelPackage

class HotelPackageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HotelPackage
        fields = ('id', 'hotel_name', 'price', 'duration', 'validity_duration', 'description')
