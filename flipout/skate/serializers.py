# skate/serializers.py

from rest_framework import serializers
from .models import Spot, SpotImage

class SpotImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotImage
        fields = ['id', 'image_path', 'created_at', 'updated_at']

class SpotSerializer(serializers.ModelSerializer):
    images = SpotImageSerializer(many=True, read_only=True)

    class Meta:
        model = Spot
        fields = ['id', 'name', 'description', 'location', 'geocode', 'type', 'difficulty', 'created_at', 'updated_at', 'images']
