from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from .scrape import WebScrape
from .models import EventData
from .service import DataProcess


def processwebdata(request):

    event_list = WebScrape.scrapeweb()
    print(len(event_list))
    eventdatalist = DataProcess.saveeventdata(event_list)
    
    return HttpResponse(eventdatalist)
