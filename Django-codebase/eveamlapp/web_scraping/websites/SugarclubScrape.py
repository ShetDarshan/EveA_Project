from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData

class SugarclubIe:
    @staticmethod
    def scrape(url,data_list):

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()



        # Finding each events
        page_soup = soup(page_html, "html.parser")
        # Finding each events
        div = page_soup.findAll('div',{"class":"grid-item"})
        for container in div:
            try:
                url=container.a['href']
            except:
                url=''
            try:
                image=container.a.img['src']
            except:
                image='None'
            title = container.h3.text
            date=container.h2.text
            #date formatting
            datesplit = date.split('/')
            date_month_year = datesplit[0].split('.')
            date = date_month_year[0].split(' ')
            date = date[1]
            dateTemp = date
            month = date_month_year[1]
            monthTemp = month
            month = datetime.datetime.strptime(month,'%m').strftime('%B')
            year = date_month_year[2]
            date = date + ' '+ month+' '+ year

            d1 = datetime.datetime(int(year), int(monthTemp), int(dateTemp))
            d2 = datetime.datetime.now()

            div_tags = container.findAll('div')
            time = datesplit[1]
            div_tags = container.findAll('div')
            price = div_tags[1].p.text
            location = "Sugar Club, Leeson Street, Dublin"
            category = "MUSIC & ENTERTAINMENT"
            if category == 'MUSIC & ENTERTAINMENT' and image == 'None':
                image = 'https://livestyle.com/wp-content/uploads/2017/07/slider-4.jpg'

            if d1>d2:
                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = title
                data.time = time
                data.location = location
                data.summary = ''
                data.img = image
                data.category = category
                data.startdate = date
                data.read_more = url
                #data.address = address
                data.enddate = ''
                data.price = price
                data_list.append(data)

        print(len(data_list))

        return data_list