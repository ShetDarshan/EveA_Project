<<<<<<< HEAD
from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime
from .GetMonth import month_string_to_number

from eveamlapp.web_scraping.models import EventData

class WhitehallIe:

    @staticmethod
    def scrape(url,data_list):

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()



        # Finding each events
        page_soup = soup(page_html, "html.parser")

        # Finding each events
        div = page_soup.findAll('div',{"class":"wrapBlock wrapBlockNews"})


        for container in div:
            # container = div[0]
            title = container.h2.text
            date=container.em.text.strip('()')
            date = date.split('/')
            dateArr = date
            month = date[1]
            # date format change
            month = datetime.datetime.strptime(month, '%m').strftime('%B')
            #date = date[0] + (' ') + month + (' ') + date[2]
            date = date[2] + '' + month +'' + date[0]

            d1 = datetime.datetime(int(dateArr[2]),int(month_string_to_number(month)),int(dateArr[0]))
            d2 = datetime.datetime.now()
            #wh = container.p.text
            #wh = str(wh)
            location = 'Whitehall College of Further Education, Drumcondra, Dublin'
            read_more = container.a['href']
            Category = 'EDUCATION, BUSINESS & TECHNOLOGY'
            img = 'https://whitehallcollege.com/uploads/pages/logo.jpg'

            if d1>d2:
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
                data.img = img
                data.read_more = read_more
                data_list.append(data)

        print(len(data_list))   
=======
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
            # date format change
            #month = datetime.datetime.strptime(month, '%m').strftime('%B')
            #date = date[0] + (' ') + month + (' ') + date[2]
            date = date[2] + (' ')+ month +(' ')+ date[0]
            #wh = container.p.text
            #wh = str(wh)
            location = 'Whitehall College of Further Education, Drumcondra, Dublin'
            read_more = container.a['href']
            Category = 'EDUCATION, BUSINESS & TECHNOLOGY'
            img = 'https://whitehallcollege.com/uploads/pages/logo.jpg'

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
            data.img = img
            data.read_more = read_more
            data_list.append(data)

        print(len(data_list))   
>>>>>>> master
        return data_list