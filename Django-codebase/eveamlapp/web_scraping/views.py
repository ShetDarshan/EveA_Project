from django.shortcuts import render
from .serializer import EventsSerializers
# Create your views here.

from django.http import HttpResponse
from .scrape import WebScrape
from .models import EventData
from .service import DataProcess
from rest_framework import viewsets
import json
from .search import Search

def processwebdata(request):

    event_list = WebScrape.scrapeweb()
    print(len(event_list))
    eventdatalist = DataProcess.saveeventdata(event_list)
    
    return HttpResponse(eventdatalist)

def search(req,inputstr = 'Dub'):
    
    print(inputstr)
    event_list = Search.searchtry(inputstr)

    print(len(event_list))
    
  
    events = list(map(lambda x: to_json(x), event_list))
    print(events)
    return HttpResponse(events)


def to_json(x):
    return {
            'title': x.title,
            'time': x.time,
            'location': x.location,
            'summary': x.summary,
            'img': x.img,
            'startdate': x.startdate,
            'enddate': x.enddate,
            'price': x.price,
            #'address': x.address,
            'read_more': x.read_more,
            'category': x.category,
            #'latitude': x.latitude,
            #'longitude': x.longitude
        }