from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime
from .GetMonth import month_string_to_number
from .geocoding_check import getOrdinates
from eveamlapp.web_scraping.models import EventData

class PoetryIrelandIE:

    @staticmethod
    def scrape(url,data_list):

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
            image='https://www.poetryireland.ie'+ a_tags[0].img['src']
            read_more= a_tags[0]['href']
            print(read_more)
            div_tags=container.findAll('div')
            date=div_tags[2].text.strip('\n\t')
    
            time_tag=date.split(',')
            time=time_tag[1]
            date=time_tag[0]
    
            #date formatting
            newdate = date.split(' ')
   
            date = newdate[1]
            month = newdate[2]
            monthTemp = month
            month = datetime.datetime.strptime(month,'%b').strftime('%B')
            year = datetime.datetime.now().year
            date = date + ' '+ month+' '+ year.__str__()

            d1 = datetime.datetime(int(year),int(month_string_to_number(monthTemp)),int(newdate[1]))

            location=div_tags[3].text
            location = location +(',')+ "Dublin"

            ordinates = getOrdinates(location)

            if str(ordinates) == 'Dublin':
                ordinates = getOrdinates("Dublin")  
            
            read_more=a_tags[1]['href']
            Category='FASHION, ART & THEATRE'

            if d1>datetime.datetime.now():
                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = title
                data.time = time
                data.location = location
                data.summary = ''
                data.img = image
                data.category = Category
                data.startdate = date
                data.read_more = read_more
                data.address = ordinates[2]
                data.latitude = ordinates[0]
                data.longitude = ordinates[1] 
                data.enddate = ''
                data.price = ''
                data_list.append(data)

        print(len(data_list))

        return data_list