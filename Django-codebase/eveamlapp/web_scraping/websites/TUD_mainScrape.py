from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData


class TUD_main:

    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()

        # Finding each events
        page_html = soup(page_html, "html.parser")

        # Finding each events
        article = page_html.find_all('div',{"class":"article-list__col col-sm-6 col-md-3"})

        for arti in article:
    
            read_more = "https://tudublin.ie"+ article[0].a["href"]

            #     date fetch with format removing all extra spaces
            raw_date = arti.find_all('p')[0].text.strip()
            raw_date = " ".join(raw_date.split())

            try:
                start_date = raw_date.split('-')[0].strip()
                end_date = raw_date.split('-')[1].strip()
            except:
                start_date = raw_date
                end_date = " "

            def date_format(date):
                new_date = date.split(',')[0].split(' ')[0]
                month = date.split(',')[0].split(' ')[1]
                year = date.split(',')[1].strip()

                month = datetime.datetime.strptime(month, '%b').strftime('%B')
                date = new_date + " " + month + " " + year
                return date

            start_date = date_format(start_date)
            try:
                end_date = date_format(end_date)
            except:
                pass
            # date = arti.find_all('p')[0].text.strip()
            # new_date = date.split(',')[0].split(' ')[0]
            # month = date.split(',')[0].split(' ')[1]
            # year = date.split(',')[1].strip()
            #
            # month = datetime.datetime.strptime(month,'%b').strftime('%B')
            # date = new_date+" "+month+" "+year

            category = "EDUCATION,BUSINESS & TECHNOLOGY"

            # location fetch removing all extra spaces

            Location = arti.find_all('li', {"class": "article-list__location"})[0].text.strip()
            Location = " ".join(Location.split())

            # description fetch removing all extra spaces
            desc = arti.find_all('p')[1].text.strip()
            desc = " ".join(desc.split())

            title = arti.h3.text
            image = "https://tudublin.ie" + arti.img["src"]
            time = arti.find_all('li',{"class":"article-list__time"})[0].text.strip()

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.img = image
            data.startdate = start_date
            data.enddate = end_date
            data.price = ' '
            data.summary = desc
            data.time = time
            data.location = Location
            data.read_more = read_more
            data.category = category
            data_list.append(data)


        print(len(data_list))
        return data_list