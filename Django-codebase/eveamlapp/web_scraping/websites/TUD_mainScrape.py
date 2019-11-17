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

            date = arti.find_all('p')[0].text.strip()
            new_date = date.split(',')[0].split(' ')[0]
            month = date.split(',')[0].split(' ')[1]
            year = date.split(',')[1].strip()
    
            month = datetime.datetime.strptime(month,'%b').strftime('%B')
            date = new_date+" "+month+" "+year

            category = "EDUCATION, BUSINESS & TECHNOLOGY"
            location = arti.find_all('li',{"class":"article-list__location"})[0].text.strip()
            desc = arti.find_all('p')[1].text.strip()
            title = arti.h3.text
            image = "https://tudublin.ie" + arti.img["src"]
            time = arti.find_all('li',{"class":"article-list__time"})[0].text.strip()

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.img = image
            data.startdate = date
            data.enddate = ' '
            data.price = ' '
            data.summary = desc
            data.time = time
            data.location = location
            data.read_more = read_more
            data.category = category
            data_list.append(data)


        print(len(data_list))
        return data_list