from rest_framework import serializers
from .models import EventData

class EventsSerializers(serializers.ModelSerializer):
    class Meta:
        model = EventData
        fields = ('title','time','location','summary','img','startdate','enddate','price','address','read_more','category',
                'latitude','longitude')