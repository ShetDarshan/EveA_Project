import sys

import json
from datetime import datetime
from google.cloud import firestore
from .models import URLCollection
from .geocoding import getOrdinates
from .models import EventData


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
                #u'startdate':u''+datetime.fromisoformat(event.startdate,
                u'startdate':u''+ event.startdate,
                u'enddate':u''+event.enddate,
                u'price':u''+event.price,
                u'address':ordinates[2],
                u'read_more':u''+event.read_more,
                u'category':u''+event.category,
                u'eventId':u''+event.id,
                u'latitude':ordinates[0],
                u'longitude':ordinates[1]
            }
            rowCount = 0
            
            # Data duplicacy check
            # fetch records from firebase based on title, location and startdate 
            existing_events = db.collection(u'events_test').where(u'title', u'==',u''+event.title).get()
            for existing_events in existing_events:
                rowCount = rowCount+1
            if rowCount == 0:
                db.collection(u'events_test').document(u''+event.id).set(data)
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

    @staticmethod
    def getevents():

        db = firestore.Client()
        event_list = list()

        docs = db.collection(u'events_test').get()


        for doc in docs:
            data_Obj = EventData()
            if doc.exists:
                ev_Data = doc.to_dict()
                
                data_Obj.title = ev_Data['title']
                data_Obj.time = ev_Data['time']
                data_Obj.location = ev_Data['location']
                data_Obj.summary = ev_Data['summary']
                data_Obj.img = ev_Data['img']
                data_Obj.startdate = ev_Data['startdate']
                data_Obj.enddate = ev_Data['enddate']
                data_Obj.category = ev_Data['category']
                data_Obj.price = ev_Data['price']
                #data_Obj.address = ev_Data['address']
                data_Obj.read_more =  ev_Data['read_more']
                data_Obj.latitude = ev_Data['latitude']
                data_Obj.longitude = ev_Data['longitude']

                event_list.append(data_Obj)
            else:
                print(u'No such document!!!')

        return event_list

    @staticmethod
    def fetchEventsByTitle(titleList):
        db = firestore.Client()
        eventsList = []

        for title in titleList:
            existing_events = db.collection(u'events_test').where(u'title', u'==',u''+title).get()
            for existing_event in existing_events:
                data_Obj = EventData()  
                if existing_event.exists:

                    ev_Data = existing_event.to_dict()
                
                    data_Obj.title = ev_Data['title']
                    data_Obj.time = ev_Data['time']
                    data_Obj.location = ev_Data['location']
                    data_Obj.summary = ev_Data['summary']
                    data_Obj.img = ev_Data['img']
                    data_Obj.startdate = ev_Data['startdate']
                    data_Obj.enddate = ev_Data['enddate']
                    data_Obj.category = ev_Data['category']
                    data_Obj.price = ev_Data['price']
                    #data_Obj.address = ev_Data['address']
                    data_Obj.read_more =  ev_Data['read_more']
                    data_Obj.latitude = ev_Data['latitude']
                    data_Obj.longitude = ev_Data['longitude']

                    eventsList.append(data_Obj)
                else:
                    print(u'No such document!!!')

        return eventsList        
            