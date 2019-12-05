from builtins import staticmethod
from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re
import datetime
from .geocoding_check import getOrdinates
from eveamlapp.web_scraping.models import EventData

class TicketmasterIe:

    @staticmethod
    def scrape(urlOriginal, data_list):
        #49
        #27
        for value in range(27,39):
            url = ""
            url = urlOriginal+format(value)
            print(url)
            try:
                JSONContent = requests.get(url).json()
            except:
                pass
            content = json.dumps(JSONContent, indent = 4, sort_keys= True)
            #print(content)  
            data = json.loads(content)

            var1 = data['_embedded']
    
            for var1 in var1['events']:
                Title = var1["name"]
                URL = var1["url"]
                date1 = var1['dates']['start']['localDate']
                date1= date1.split('-')
                month = date1[1]
                date2 = datetime.datetime.strptime(month,'%m').strftime('%B')
                date = date1[2] + ' ' + date2 + ' ' + date1[0]
                d1 = datetime.datetime(int(date1[0]),int(date1[1]),int(date1[2]))
                d2= datetime.datetime.now()
                try:
                    Time = var1['dates']['start']['localTime']
                except:
                    Time =''
                try:
                    Address_Line_1 = var1['_embedded']['venues'][0]['address']['line1']
                except:
                    Address_Line_1 = ''
                try:
                    Address_Line_2 = var1['_embedded']['venues'][0]['address']['line2']
                except:
                    Address_Line_2 = ''
                try:
                    Postal_Code = var1['_embedded']['venues'][0]['postalCode']
                except:
                    Postal_Code =''    
                img = var1['images'][2]['url']
                category = var1['classifications'][0]['segment']['name']
                if category == 'Arts & Theatre' or category == '':
                    category = 'FASHION, ART & THEATRE' 
                elif category == 'Sport' or category == 'Sports':
                    category = 'SPORTS & HEALTH'
                elif category == 'Family & Attractions':
                    category = 'COMMUNITY & FESTIVALS'
                elif category == 'Music':
                    category = 'MUSIC & ENTERTAINMENT'
                else:
                    category = 'OTHERS'
                #Subcategory =var1['classifications'][0]['genre']['name']
                Venue =var1['_embedded']['venues'][0]['name']
                #Location = Venue+(' ')+ Address_Line_1 +(' ')+ Address_Line_2 +(' ')+ Postal_Code
                Location = Venue + "Dublin"


                try:
                        
                    if Location == 'Dublin':
                        ordinates[2] = "The Spire,North City,Dublin"
                        ordinates[0] = 53.3498091
                        ordinates[1] = -6.2602548                        
                        
                    else:
                        ordinates = getOrdinates(Location)

                except:
                    continue

                if d1>d2:
                    data = EventData()

                    data.id = uuid.uuid1().__str__()
                    data.title = Title
                    data.time = Time
                    data.location = Location
                    data.summary = ''
                    data.img = img
                    data.category = category
                    data.startdate = date
                    data.read_more = URL
                    data.address = ordinates[2]
                    data.latitude = ordinates[0]
                    data.longitude = ordinates[1]
                    data.enddate = ''
                    data.price = ''
                    data_list.append(data)

        print(len(data_list))

        return data_list