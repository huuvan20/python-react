from rest_framework import viewsets
from .serializers import HotelPackageSerializer
from .models import HotelPackage

# Create your views here.
class HotelPackageViewSet(viewsets.ModelViewSet):
    queryset = HotelPackage.objects.all().order_by('price')
    serializer_class = HotelPackageSerializer
