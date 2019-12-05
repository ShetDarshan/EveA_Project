from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re
import datetime
from bs4 import BeautifulSoup as soup
from .geocoding_check import getOrdinates
from .GetMonth import month_string_to_number

from eveamlapp.web_scraping.models import EventData

class RCSIIE:

    @staticmethod
    def scrape(urlOriginal,data_list):
        #4
        for value in range(1,4):
            url = ""
            url = urlOriginal+format(value)
            print(url)

            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()

            page_soup = soup(page_html, "html.parser")
            div = page_soup.find_all('li',{"class":"wrapped wrapped-borderless"})
    

            for container in div:
                Title=container.h3.text.strip()
                URL= 'https://www.rcsi.com'+container.a['href']
                date = container.div.text.replace("\n"," ")

                # date formatting
                date_split = date.split(' ')
                date = date_split[1]
                if "-" in date:
                    datecheck = date.split('-')
                    date = datecheck[0]
                    enddate1 = datecheck[1]
                month = date_split[2] 
                month = datetime.datetime.strptime(month,'%b').strftime('%B')
                year = datetime.datetime.now().year
                date1 = date + ' '+ month+ ' '+ year.__str__()
                d1=datetime.datetime(int(year),int(month_string_to_number(month)),int(date))

                try:
                    enddate = enddate1 + ' '+ month+ ' '+ year.__str__()
                    d1=datetime.datetime(int(year),int(month_string_to_number(month)),int(enddate1))
                except:
                    enddate = 'None'
               
                d2 = datetime.datetime.now()
                
                Location = container.p.text.strip('\n')
                

                try:

                    if Location == 'Dublin':
                        ordinates[2] = "The Spire,North City,Dublin"
                        ordinates[0] = 53.3498091
                        ordinates[1] = -6.2602548
                        
                    else:
                        ordinates = getOrdinates(Location)

                except:
                    continue



                ordinates = getOrdinates(Location)
                if str(ordinates) == 'Dublin':
                    ordinates = getOrdinates("Dublin")  
                
                
                Category ='EDUCATION, BUSINESS & TECHNOLOGY'
                img ='http://www.hrbcentreprimarycare.ie/images/rcsilogonewer.png'

                if d1>d2:
                    data = EventData()

                    data.id = uuid.uuid1().__str__()
                    data.title = Title
                    data.time = ''
                    data.location = Location
                    data.summary = ''
                    data.img = img
                    data.category = Category
                    data.startdate = date1
                    data.read_more = URL
                    data.address = ordinates[2]
                    data.latitude = ordinates[0]
                    data.longitude = ordinates[1] 
                    data.enddate = enddate
                    data.price = ''
                    data_list.append(data)

        print(len(data_list))

        return data_list

