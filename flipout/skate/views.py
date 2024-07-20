# skate/views.py

from rest_framework import status, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Spot, SpotImage
from .serializers import SpotSerializer, SpotImageSerializer

class SpotListCreateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        spots = Spot.objects.all()
        serializer = SpotSerializer(spots, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SpotSerializer(data=request.data)
        if serializer.is_valid():
            spot = serializer.save()
            # Manejo de imágenes
            if 'image' in request.FILES:
                image = request.FILES['image']
                SpotImage.objects.create(spot=spot, image_path=image)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SpotDetailView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, pk):
        try:
            return Spot.objects.get(pk=pk)
        except Spot.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        spot = self.get_object(pk)
        serializer = SpotSerializer(spot)
        return Response(serializer.data)

    def put(self, request, pk):
        spot = self.get_object(pk)
        serializer = SpotSerializer(spot, data=request.data)
        if serializer.is_valid():
            spot = serializer.save()
            # Manejo de imágenes
            images = request.FILES.getlist('images')
            SpotImage.objects.filter(spot=spot).delete()  # Eliminar imágenes anteriores
            for image in images:
                SpotImage.objects.create(spot=spot, image_path=image)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        spot = self.get_object(pk)
        spot.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SpotViewSet(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer
