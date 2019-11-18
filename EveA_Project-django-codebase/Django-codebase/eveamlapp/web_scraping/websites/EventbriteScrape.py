from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re

from eveamlapp.web_scraping.models import EventData

class EventIe:

    @staticmethod
    def scrape(urlOriginal):

        data_list = []
        i=0
        for value in range(1,20):
            url = ""
            url = urlOriginal+format(value)
            print(url)
            JSONContent = requests.get(url).json()
            content = json.dumps(JSONContent, indent = 4, sort_keys= True)
            #print(content)  
            data = json.loads(content)



            for events in data['events']:
                name = events['name']['text']
                description = events['description']['text']
                description = format(description)
                link = events['url']
                start_datetime = events['start']['local']
                end_datetime = events['end']['local']
                #free_event = events['is_free']
                category_id = events['category_id']
                try:
                    img = events['logo']['original']['url']
                except:
                    img = 'none'
                try:
                    Location = events['venue']['address']['localized_multi_line_address_display']
                    Location = format(Location)
                except:
                    Location = 'none'    
                
                # Category name fetching from Eventbrite
                
                
                url = "https://www.eventbriteapi.com/v3/categories/?token=4KFS7BDPSZ5A5KWQ62KZ"

                JSONContent = requests.get(url).json()
                content = json.dumps(JSONContent, indent = 4, sort_keys= True)
                categorylist = json.loads(content)
                category_list = []

                for categories in categorylist['categories']:
                    name=categories['name']
                    id_cat=categories['id']
                    cate = {}
                    cate["name"] = name
                    cate["category_id"] = id_cat
        
                    category_list.append(cate)



                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = name
                data.time = ''
                data.location = Location
                data.summary = description
                data.img = img
                data.category = category_id
                data.startdate = start_datetime
                data.read_more = link
                #data.address = address
                data.enddate = end_datetime
                data.price = ''
                data_list.append(data)
                i=i+1

            #print(len(data))
    
        print(len(data_list))

        return data_list

    