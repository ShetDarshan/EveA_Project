import sys

import json
from datetime import datetime
from google.cloud import firestore
from .models import URLCollection
from .geocoding import getOrdinates


class DataProcess:

    @staticmethod
    def saveeventdata(eventData):
        db = firestore.Client()
        eventData:list
        ##response = requests.post('http://www.example.com/rest-auth/users/1/',data=eventData)
        i=0
        for event in eventData:
            i=i+1
            ordinates = getOrdinates(event.location)
            #filtering only dublin adress
            if "Dublin" not in str(ordinates):
                ordinates = getOrdinates("Dublin")
            data = {
                u'title': u''+event.title,
                u'time': u''+event.time,
                u'location': u''+event.location,
                u'summary': u''+event.summary,
                u'img':u''+event.img,
                u'startdate':u''+event.startdate,
                u'enddate':u''+event.enddate,
                u'price':u''+event.price,
                u'address':ordinates[2],
                u'read_more':u''+event.read_more,
                u'category':u''+event.category,
                u'latitude':ordinates[0],
                u'longitude':ordinates[1]
            }
            rowCount = 0
            
            # Data duplicacy check
            # fetch records from firebase based on title, location and startdate 
            existing_events = db.collection(u'events_list').where(u'title', u'==',u''+event.title).get()
            for existing_events in existing_events:
                rowCount = rowCount+1
            if rowCount == 0:
                db.collection(u'events_list').document(u''+event.id).set(data)
        print(len(eventData))        
        return eventData

    @staticmethod
    def geturls():

        db = firestore.Client()
        urls = list()

        docs = db.collection(u'urlCollection').get()

        for doc in docs:
            urlObj = URLCollection()
            if doc.exists:
                urlData = doc.to_dict()
                urlObj.url = urlData['url']
                urlObj.urlType = urlData['type']
                urlObj.referenceId = urlData['urlIdentifier']
                
                print(urlObj.urlType+":"+urlObj.url)

                urls.append(urlObj)
            else:
                print(u'No such document!!!')
        return urls