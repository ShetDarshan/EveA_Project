from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData

class WhitehallIe:
    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()



        # Finding each events
        page_soup = soup(page_html, "html.parser")

        # Finding each events
        div = page_soup.findAll('div',{"class":"wrapBlock wrapBlockNews"})

        data_list = []

        for container in div:
            # container = div[0]
            title = container.h2.text
            date=container.em.text.strip('()')
            date = date.split('/')
            month = date[1]
            month = datetime.datetime.strptime(month, '%m').strftime('%B')
            date = date[0] + (' ') + month + (' ') + date[2]
            #wh = container.p.text
            #wh = str(wh)
            location = 'Whitehall College of Further Education, Drumcondra, Dublin'
            read_more = container.a['href']
            Category = 'EDUCATION,BUSINESS & TECHNOLOGY'


            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.startdate = date
            data.enddate = ''
            data.time = ''
            data.category = Category
            data.price = ''
            data.summary = ''
            data.location = location
            data.img = ''
            data.read_more = read_more
            data_list.append(data)

        print(len(data_list))   
        return data_list