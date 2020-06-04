from django.db import models

# Create your models here.
class HotelPackage(models.Model):
    hotel_name = models.CharField(max_length=255)
    price = models.FloatField()
    duration = models.CharField(max_length=255)
    validity_duration = models.CharField(max_length=255)
    description = models.TextField()
    
    def __str__(self):
        return self.hotel_name
