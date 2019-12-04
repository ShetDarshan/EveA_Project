
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
from .recommend import Recommend
from .Nearby import Nearby
from django.http import JsonResponse
from .UserSuggestion import UserRecommend
import time


def processwebdata(request):

    event_list = WebScrape.scrapeweb()
    time.sleep(2)
    eventdatalist = DataProcess.saveeventdata(event_list)
    
    return HttpResponse(eventdatalist)


def search(req,inputstr = 'Dub'):
    
    print(inputstr)
    event_list = Search.searchtry(inputstr)

    print(len(event_list))
    
  
    events = list(map(lambda x: to_json(x), event_list))
    #print(events)
    return HttpResponse(events)


def recommendations(req,inputstr = 'Book of Kells'):
    print(inputstr)
    recommendations_list = Recommend.eventsrecommendations(inputstr)

    recomendedEventsList = DataProcess.fetchEventsByTitle(recommendations_list)

    events = list(map(lambda x: to_json(x), recomendedEventsList))

    return JsonResponse(events, safe=False)


def nearby(req,inputstr = 'Book of Kells'):
    print(inputstr)
    nearby_list = Nearby.eventsNearBy(inputstr)

    nearByEventsList = DataProcess.fetchEventsByTitle(nearby_list)

    events = list(map(lambda x: to_json(x), nearByEventsList))

    return JsonResponse(events, safe=False)


def usersrecommend(req, inputstr = ''):
    print(inputstr)
    usersrecommend_list = UserRecommend.userRecommendations(inputstr)
   
    #users = list(map(lambda x: users_json(x), usersrecomment_list))
    print(usersrecommend_list)
    return JsonResponse(usersrecommend_list, safe= False)


def deletePastEvents(request):

    print('begin delete')

    DataProcess.deletePastEvents()
    print("finish delete")

    return HttpResponse("events deleted successfully")




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
            'latitude': x.latitude,
            'longitude': x.longitude
        }





