from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import pandas as pd
import datetime

from eveamlapp.web_scraping.models import EventData


class DublintownScrape:
    @staticmethod
    def scrape(urlOriginal):
        data_list = []
        for value in range(1, 4):
            url = ""
            url = urlOriginal + format(value) + '/'
            print(url)
            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()

            # Finding each events
            page_soup = soup(page_html, "html.parser")
            # Finding each events
            div = page_soup.findAll('article', {"class": "article whatsonarticle"})

            for container in div:

                Title = container.h3.text.strip()
                category = container.h5.text.strip()
                if category == 'Activities, Fashion' or category == 'Activities, Art, Workshop':
                    category = 'FASHION, ART & THEATRE'

                elif category == 'Activities, Drinks, Family, Food And Drink, Nightlife, Talks, Workshop' or category == 'Food And Drink' or category == 'Drinks, Food And Drink, History, Tours' or category == 'Drinks, History, Tours' or category == 'Drinks, Food And Drink' or category == 'Drinks' or category == 'Activities, Drinks, Family, Food And Drink, Nightlife, Talks, Workshop' or category == 'Drinks' or category == 'Culture, Food And Drink':
                    category = 'FOOD & DRINK'

                elif category == 'Activities, Culture, Exhibition':
                    category = 'COMMUNITY & FESTIVALS'

                elif category == 'Tours' or category == 'Music, Tours' or category == 'Culture, Tours' or category == 'Music, Nightlife' or category == 'Music' or category == 'Activities, Art, Culture, Drinks, Fashion, Food And Drink, Free, Market' or category == 'Activities, Comedy' or category == 'Activities, Culture, Exhibition':
                    category = 'MUSIC & ENTERTAINMENT'

                elif category == 'Theatre' or category == 'Fashion' or category == 'Culture, Theatre' or category == 'Halloween, Theatre' or category == 'Activities, Fashion' or category == 'Culture, Exhibition, Family, Food And Drink' or category == 'Activities, Art, Workshop' or category == 'Family, Theatre':
                    category = 'FASHION, ART & THEATRE'

                elif category == '':
                    category = 'OTHER'
                elif category == 'Beauty, Fitness':
                    category = 'SPORTS & HEALTH'
                URL = container.a['href']
                try:
                    image = container.a.img['src']
                except:
                    image = 'None'
                date = container.cite.text.strip('\n\t\t')
                split_date = date.split('-')
                start_date = split_date[0]
                try:
                    end_date = split_date[1]
                except:
                    end_date = 'None'
                # date formatting for end_date
                if end_date is not 'None':
                    format_date = end_date.split(' ')
                    date = format_date[1]
                    month = format_date[2]
                    year = format_date[3]
                    monthfull = datetime.datetime.strptime(month, '%b').strftime('%B')
                    end_date = date + (' ') + monthfull + (' ') + year

                # date formatting for start_Date
                format_date = start_date.split(' ')
                date = format_date[0]
                month = format_date[1]
                year = format_date[2]
                monthfull = datetime.datetime.strptime(month, '%b').strftime('%B')
                start_date = date + (' ') + monthfull + (' ') + year
                start_date = start_date.strip('\t\t')

                # date formatting for end_date

                a_tags = container.div.findAll('a')

                Location = a_tags[2].text
                data = EventData()

                data.id = uuid.uuid1()._str_()
                data.title = Title
                data.time = ''
                data.location = Location
                data.summary = ''
                data.img = image
                data.category = category
                data.startdate = start_date
                data.read_more = URL
                # data.address = address
                data.enddate = end_date
                data.price = ''
                data_list.append(data)

        print(len(data_list))

        return data_list