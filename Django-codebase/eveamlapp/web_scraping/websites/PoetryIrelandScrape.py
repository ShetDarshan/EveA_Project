from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData

class PoetryIrelandIE:
    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()



        # Finding each events
        page_soup = soup(page_html, "html.parser")
        # Finding each events
        div = page_soup.findAll('article',{"class":"col-sm-1-3 col-md-1-3 col-lg-4 item item-event"})
        for container in div:
            
            title = container.h2.text
            a_tags=container.findAll('a')
            image=a_tags[0].img['src']
            read_more= a_tags[0]['href']
            div_tags=container.findAll('div')
            date=div_tags[2].text.strip('\n\t')
    
            time_tag=date.split(',')
            time=time_tag[1]
            date=time_tag[0]
    
            #date formatting
            newdate = date.split(' ')
   
            date = newdate[1]
            month = newdate[2]
            month = datetime.datetime.strptime(month,'%b').strftime('%B')
            year = "2019"
            date = date + (' ')+ month+(' ')+ year
            Location=div_tags[3].text
            read_more=a_tags[1]['href']
            Category='Art & Theatre'

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.time = time
            data.location = Location
            data.summary = ''
            data.img = image
            data.category = Category
            data.startdate = date
            data.read_more = read_more
            #data.address = address
            data.enddate = ''
            data.price = ''
            data_list.append(data)

        print(len(data_list))

        return data_list