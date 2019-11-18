from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData

class TicketmasterIe:

    @staticmethod
    def scrape(urlOriginal):

        data_list = []
        for value in range(1,2):
            url = ""
            url = urlOriginal+format(value)
            print(url)
            JSONContent = requests.get(url).json()
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
                date = date1[2] + (' ')+ date2 + (' ') + date1[0]
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
                Category = var1['classifications'][0]['segment']['name']
                #Subcategory =var1['classifications'][0]['genre']['name']
                Venue =var1['_embedded']['venues'][0]['name']
                Location = Venue+(' ')+ Address_Line_1 +(' ')+ Address_Line_2 +(' ')+ Postal_Code


                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = Title
                data.time = Time
                data.location = Location
                data.summary = ''
                data.img = img
                data.category = Category
                data.startdate = date
                data.read_more = URL
                #data.address = address
                data.enddate = ''
                data.price = ''
                data_list.append(data)

        print(len(data_list))

        return data_list