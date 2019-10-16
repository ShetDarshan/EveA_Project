from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re
from bs4 import BeautifulSoup as soup
import datetime
import pandas as pd

from eveamlapp.web_scraping.models import EventData


class EventIe:

    @staticmethod
    def scrape(urlOriginal):

        data_list = []
        i = 0
        for value in range(1, 67):
            url = ""
            url = urlOriginal+format(value)
            print(url)
            JSONContent = requests.get(url).json()
            content = json.dumps(JSONContent, indent=4, sort_keys=True)
            # print(content)
            data = json.loads(content)
            # location and categories
            # replacing category_id with their corresponding category name
            # scraping category id and name
            url1 = "https://www.eventbriteapi.com/v3/categories/?token=4KFS7BDPSZ5A5KWQ62KZ"
            catJSONContent = requests.get(url1).json()
            catcontent = json.dumps(catJSONContent, indent=4, sort_keys=True)
            # print(content)
            categorylist = json.loads(catcontent)

            category_list = []

            for categories in categorylist['categories']:
                name = categories['name']
                id_cat = categories['id']
                categoryy = name, id_cat
                category_list.append(categoryy)

            category_list = list(category_list)

            for events in data['events']:
                name = events['name']['text']
                description = events['description']['text']
                description = format(description)
                link = events['url']
                start_datetime = events['start']['local']

                # formating start date and time
                start_date_split = start_datetime.split('T')
                start_date = start_date_split[0]
                start_time = start_date_split[1]
                start_date = start_date.split('-')
                date = start_date[2]
                month = start_date[1]
                year = start_date[0]
                month = datetime.datetime.strptime(month, '%m').strftime('%B')
                start_date = date + (' ') + month+(' ') + year

                # end_date
                end_datetime = events['end']['local']

                # formating end date and time
                end_date_split = end_datetime.split('T')
                end_date = end_date_split[0]
                end_time = end_date_split[1]
                time = start_time + ('-') + end_time
                end_date = end_date.split('-')
                date = end_date[2]
                month = end_date[1]
                year = end_date[0]
                month = datetime.datetime.strptime(month, '%m').strftime('%B')
                end_date = date + (' ') + month+(' ') + year
                # event price
                free_event = events['is_free']
                if free_event == True:
                    price = 'free'
                else:
                    price = 'check link for more details'
                category_id = events['category_id']
                # replacing category_id with category name
                for each in category_list:
                    if category_id in each[1]:
                        category = each[0]

                # Category Uniformication
                if category == 'Auto, Boat & Air' or category == 'Health & Wellness' or category == 'Sports & Fitness':
                    category = 'HEALTH & SPORTS'
                elif category == 'Business & Professional' or category == 'Science & Technology' or category == 'School Activities' or category == 'Government & Politics':
                    category = 'EDUCATION,BUSINESS & TECHNOLOGY'
                elif category == 'Charity & Causes' or category == 'Community & Culture' or category == 'Family & Education' or category == 'Home & Lifestyle' or category == 'Religion & Spirituality':
                    category = 'COMMUNITY & FESTIVALS'
                elif category == 'Fashion & Beauty' or category == 'Film, Media & Entertainment' or category == 'Performing & Visual Arts':
                    category = 'FASHION,ART & THEATRE'
                elif category == 'Food & Drink':
                    category = 'FOOD & DRINK'
                elif category == 'FREE':
                    category = 'FREE'
                elif category == 'Music' or category=='Hobbies & Special Interest':
                    category = 'MUSIC & ENTERTAINMENT'
                elif category == 'Travel & Outdoor' or category == 'Seasonal & Holiday':
                    category = 'TRAVEL'
                elif category == 'Other':
                    category = 'OTHER'

                try:
                    img = events['logo']['original']['url']
                except:
                    img = 'none'
                Location = events['venue']['address']['localized_multi_line_address_display']
                # location formatting
                location = str(Location).strip('[]')
                location = location.split(',')
                try:    
                    location[0] = location[0].strip("''")
                except:
                    pass
                try:
                    location[1] = location[1].strip(" ''")
                except:
                    pass
                # print(location[0])
                # print(location[1])
                try:
                    location = location[0] + (' ') + location[1]
                except:
                    location = location[0]
        

                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = name
                data.time = time
                data.location = location
                data.summary = description
                data.img = img
                data.category = category
                data.startdate = start_date
                data.read_more = link
                # data.address = address
                data.enddate = end_date
                data.price = price
                data_list.append(data)
                i = i+1

            # print(len(data))

        print(len(data_list))
        return data_list

                  

    
