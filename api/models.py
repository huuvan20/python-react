from django.db import models

# Create your models here.
class HotelPackage(models.Model):
    hotel_name = models.CharField(max_length=255)
    price = models.FloatField()
    duration = models.DurationField()
    validity_duration = models.DurationField()
    description = models.TextField()
    
    def __str__(self):
        return self.hotel_name
