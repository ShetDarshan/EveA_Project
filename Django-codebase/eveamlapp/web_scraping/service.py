import sys

import json
from datetime import datetime
from google.cloud import firestore
from .models import URLCollection
from .geocoding import getOrdinates
from .models import EventData, UsersData
from .websites.GetMonth import month_string_to_number
from .algolia import addeventstoalgolia, deleteeventsalgolia
import time


class DataProcess:

    @staticmethod
    def saveeventdata(eventData):
        db = firestore.Client()
        eventData: list
        ##response = requests.post('http://www.example.com/rest-auth/users/1/',data=eventData)
        i = 0
        addevents = []
        for event in eventData:

            data = {
                u'title': u''+event.title,
                u'time': u''+event.time,
                u'location': u''+event.location,
                u'summary': u''+event.summary,
                u'img': u''+event.img,
                # u'startdate':u''+datetime.fromisoformat(event.startdate,
                u'startdate': u'' + event.startdate,
                u'enddate': u''+event.enddate,
                u'price': u''+event.price,
                u'address': u''+event.address,
                # u'address':ordinates[2],
                u'read_more': u''+event.read_more,
                u'category': u''+event.category,
                u'eventId': u''+event.id,
                u'latitude': event.latitude,
                u'longitude': event.longitude
                # u'latitude':ordinates[0],
                # u'longitude':ordinates[1]
            }

            rowCount = 0
        #     ## Data duplicacy check
        #     # fetch records from firebase based on title, location and startdate

            existing_events = db.collection(u'events_details').where(u'title', u'==', u''+event.title).where(
                u'startdate', u'==', u''+event.startdate).where(u'location', u'==', u''+event.location).get()

            for existing_events in existing_events:
                rowCount = rowCount+1

            if rowCount == 0:
                i = i+1

                addevents.append(event)
                db.collection(u'events_details').document(u''+event.id).set(data)

        addeventstoalgolia(addevents)

        print("num of events added:")
        print(i)

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

        docs = db.collection(u'events_details').get()

        for doc in docs:
            data_Obj = EventData()
            if doc.exists:
                ev_Data = doc.to_dict()
                # if ev_Data['title']:
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
                data_Obj.read_more = ev_Data['read_more']
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
            existing_events = db.collection(u'events_details').where(
                u'title', u'==', u''+title).get()
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
                    data_Obj.read_more = ev_Data['read_more']
                    data_Obj.latitude = ev_Data['latitude']
                    data_Obj.longitude = ev_Data['longitude']

                    eventsList.append(data_Obj)
                else:
                    print(u'No such document!!!')

        return eventsList


# userdata fetch

    @staticmethod
    def getusers():

        db = firestore.Client()
        users_list = list()

        docs = db.collection(u'users').get()

        for doc in docs:
            data_Obj = UsersData()
            if doc.exists:
                ev_Data = doc.to_dict()

                data_Obj.address = ev_Data['address'] if any(
                    'address' in x for x in ev_Data) else ""
                data_Obj.bio = ev_Data['bio'] if any(
                    'bio' in x for x in ev_Data) else ""
                data_Obj.birthday = ev_Data['birthday'] if any(
                    'birthday' in x for x in ev_Data) else ""
                data_Obj.createdAt = ev_Data['createdAt'] if any(
                    'createdAt' in x for x in ev_Data) else ""
                data_Obj.email = ev_Data['email'] if any(
                    'email' in x for x in ev_Data) else ""
                data_Obj.gender = ev_Data['gender'] if any(
                    'gender' in x for x in ev_Data) else ""
                data_Obj.handle = ev_Data['handle'] if any(
                    'handle' in x for x in ev_Data) else ""
                data_Obj.imageUrl = ev_Data['imageUrl'] if any(
                    'imageUrl' in x for x in ev_Data) else ""
                data_Obj.interests = ev_Data['interests'] if any(
                    'interests' in x for x in ev_Data) else ""
                data_Obj.location = ev_Data['location'] if any(
                    'location' in x for x in ev_Data) else ""
                data_Obj.userId = ev_Data['userId'] if any(
                    'userId' in x for x in ev_Data) else ""

                users_list.append(data_Obj)
            else:
                print(u'No such document!!!')

        return users_list


# delete past events
    @staticmethod
    def deletePastEvents():
        db = firestore.Client()
        eventids = []
        docs = db.collection(u'events_details').get()
        dateStr = f"{datetime.now():%Y-%m-%d}"
        print(dateStr)
        for doc in docs:

            if doc.exists:
                ev_Data = doc.to_dict()

                id = ev_Data['eventId']
                startDate = ev_Data['startdate']
                endDate = ev_Data['enddate']
                d1 = None

                if endDate.strip() and endDate != 'None':
                    dateArr = endDate.split(' ')
                    d1 = datetime(int(dateArr[2]), int(
                        month_string_to_number(dateArr[1])), int(dateArr[0]))
                elif startDate.strip() and not endDate.strip():
                    if startDate == "None" or startDate == "Multiple Dates GMT" or startDate == "Multiple Dates IST" or startDate == "Multiple Dates":
                        print("startdate None")
                    else:
                        print("inside"+startDate)
                        dateArr = startDate.split(' ')
                        d1 = datetime(int(dateArr[2]), int(
                            month_string_to_number(dateArr[1])), int(dateArr[0]))

                d2 = datetime.now()
                i = 0

                if d1 and d2 > d1:

                    d1str = f"{d1:%Y-%m-%d}"
                    d2str = f"{d2:%Y-%m-%d}"

                    if d1str != d2str:
                        data = {
                            u'title': u'' + ev_Data['title'],
                            u'time': u'' + ev_Data['time'],
                            u'location': u'' + ev_Data['location'],
                            u'summary': u'' + ev_Data['summary'],
                            u'img': u'' + ev_Data['img'],
                            # u'startdate':u''+datetime.fromisoformat(event.startdate,
                            u'startdate': u'' + ev_Data['startdate'],
                            u'enddate': u'' + ev_Data['enddate'],
                            u'price': u'' + ev_Data['price'],
                            u'address': u'' + ev_Data['address'],
                            u'read_more': u'' + ev_Data['read_more'],
                            u'category': u'' + ev_Data['category'],
                            u'eventId': u'' + doc.id,
                            u'latitude': u'' + format(ev_Data['latitude']),
                            u'longitude': u'' + format(ev_Data['longitude'])
                        }
                        i = i+1
                        eventids.append(id)

                        #print("adding to backup table for id"+ id)
                        db.collection(u'events_past_' +
                                      dateStr).document(u'' + id).set(data)
                        db.collection(u'events_details').document(
                            u''+id).delete()
                print("no of items deleted"+format(i))
            else:
                print('No such Document')

        deleteeventsalgolia(eventids)
