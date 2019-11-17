from rest_framework import serializers
from evea.eveamlapp.web_scraping.models import EventData
from rest_framework import viewsets


class EveaSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = EventData
        fields = ('id', 'title', 'time', 'location', 'summary', 'img')


class EventViewSet(viewsets.ModelViewSet):

    queryset = EventData.objects.all()
    serializer_class = EveaSerializer