from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re
import datetime
from bs4 import BeautifulSoup as soup

from eveamlapp.web_scraping.models import EventData

class DubChamberIE:
    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()

        page_soup = soup(page_html, "html.parser")

        
        article = page_soup.find_all('div',{"class":"c-feed-box-outer"})
        #print(len(article))
        #print(article[0])
        for arti in article:
            url2 = 'https://portal.dublinchamberhosting.com' + arti.a["href"]
            #Opening connection to second page, grabbing the page
            uClient = uReq(url2)
            page_html = uClient.read()
            uClient.close()
            #Parsing2
            page_soup = soup(page_html, "html.parser")
            #print(page_soup)
            try:
                image = page_soup.find_all('div',{"class":"c-banner_background-image o-cropcontent o-crop_content--center"})[0].img["src"]
            except:
                image = 'https://uindia.net/assets/img/MediaTechnology.jpg'
                    
            desc = page_soup.find_all('div',{"class":"description"})[0].p.text.strip()
            try:
                desc = desc.span.text.strip()
            except:
                desc = desc
            event_box = page_soup.find_all('div',{"class":"c-event-booking__right-column"})[0]
            event_box = event_box.find_all('div',{"class":"c-event_event-info"})[0].find_all('div',{"class":"c-event-info_value"})
            title = event_box[0].text.strip()
            date = event_box[1].text.strip()
            #Date formatting
            newdate = date.split(' ')
            date = newdate[1]
            month = newdate[2]
            month = datetime.datetime.strptime(month,'%b').strftime('%B')
            year = newdate[3]
            date = date + (' ') + month + (' ')+ year
            time = event_box[2].text.strip()
            address = event_box[3].text.strip()
            category = "EDUCATION, BUSINESS & TECHNOLOGY"

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.time = time
            data.location = address
            data.summary = desc
            data.img = image
            data.category = category
            data.startdate = date
            data.read_more = url2
            #data.address = address
            data.enddate = ''
            data.price = ''
            data_list.append(data)

        print(len(data_list))

        return data_list
