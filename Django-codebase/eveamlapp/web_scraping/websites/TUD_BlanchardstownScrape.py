from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData
#from models import EventData

class TUD_Blanchardstown:
    @staticmethod
    def scrape(url,data_list):

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()

        # Finding each events
        page_html = soup(page_html, "lxml")
        # Finding each events
        article = page_html.find_all('div',class_='news_snippet')

        for container in article:
            # container = article[0]
            title = container.h3.text.strip()
            p_tags = container.findAll('p')
            olddate = p_tags[0].text.strip()
            #date formatting
            datesplit =olddate.split('/')
            date = datesplit[0]
            month = datesplit[1]
            monthTemp = month
            month = datetime.datetime.strptime(month,'%m').strftime('%B')
            year = datesplit[2].split(' ')
            year = year[0]
    
            date = date + ' '+ month + ' '+ year

            d1 = datetime.datetime(int(year),int(monthTemp), int(date))

            summary = p_tags[1].text.strip()
            read_more = container.a['href']
            read_more = 'https://www.itb.ie/NewsEvents/' + read_more
            location = "Technological University Dublin, Blanchardstown, Dublin 15"
            Category='EDUCATION, BUSINESS & TECHNOLOGY'
            image = 'https://uindia.net/assets/img/MediaTechnology.jpg'

            if d1>datetime.datetime.now():
                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = title
                data.img = image
                data.startdate = date
                data.enddate = ' '
                data.price = ' '
                data.summary = summary
                data.time = ''
                data.location = location
                data.read_more = read_more
                data.category = Category
                data_list.append(data)


        print(len(data_list))
        return data_list

