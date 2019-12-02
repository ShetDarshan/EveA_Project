from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime
from .GetMonth import month_string_to_number
from .geocoding_check import getOrdinates
from eveamlapp.web_scraping.models import EventData

class EventbriteBusiness:

    @staticmethod
    def scrape(urlOriginal,data_list):
  
        i = 0
        #36
        for value in range(1,2):
            url = ""
            url = urlOriginal+format(value)
            print(url)
            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()
            #Parsing
            page_soup = soup(page_html, "html.parser")
            #article = page_soup.findAll('ul',class_='search-main-content__events-list')
            article_1 = page_soup.findAll('div',class_='search-event-card-wrapper')
   
            # fetching each details
            for container in article_1:
                title = container.findAll('div', class_='eds-event-card__formatted-name--is-clamped')[0].text
            
                try:
                    Date_time = container.findAll('div',class_='eds-text-color--primary-brand eds-l-pad-bot-1 eds-text-weight--heavy eds-text-bs')[0].text
                except:
                    Date_time='None'
                # try:
                #     Location = container.findAll('div',class_='card-text--truncated__one')[0].text
                # except:
                #     Location='None'
                try:
                    Price = container.findAll('div',class_='eds-media-card-content__sub eds-text-bm eds-text-color--grey-600 eds-l-mar-top-1 eds-media-card-content__sub--cropped')[1].text
                except:
                    Price='None'
                a_tags=container.findAll('a')
                try:
                    image=a_tags[0].img['src']
                except:
                    image = 'None'
                read_more= a_tags[0]['href']
                print(read_more)
                
            
                category='EDUCATION, BUSINESS & TECHNOLOGY'
                if category == 'EDUCATION, BUSINESS & TECHNOLOGY' and image == 'None':
                    image = 'https://uindia.net/assets/img/MediaTechnology.jpg'
                
                
                    
                # description
                
                descurl = read_more
                #Opening connection , grabbing the page
                uClient = uReq(descurl)
                desc_html = uClient.read()
                uClient.close()
                #Parsing
                desc_soup = soup(desc_html, "html.parser")
                #print(desc_soup)
                
                desc = desc_soup.findAll('div', class_='js-xd-read-more-contents l-mar-top-3') or desc_soup.findAll('div',class_='structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium')
                if len(desc) > 0:
                    try:
                        p_tags = desc[0].findAll('p')
                    except:
                        continue

                    descrip = []
                    for i in range(len(p_tags)):
                        descript = p_tags[i].text
                        descrip.append(descript)
                    description = ''.join(str(e) for e in descrip)
                else:
                    description = 'None'
                

                # date fetching and formatting

                time = desc_soup.findAll('time', class_='clrfix')
                if len(time) > 0:
                    time_tags = time[0].findAll('p')
                    date_check = time_tags[0].text
                    if date_check == 'Multiple Dates' or date_check == 'Multiple Dates GMT':
                        Final_Date = date_check
                        
                    else:
                        Date_time= date_check.split(',')

                        if (len(Date_time))==2:
                            Final_Date = Date_time[1].strip(' ')
                            
                        else:
                            Mon_Date= Date_time[1].split(' ')
                            if len(Mon_Date) == 3:
                                Date = Mon_Date[2]
                                month = Mon_Date[1]
                                if len(month) <= 3:
                                    Month = datetime.datetime.strptime(month,'%b').strftime('%B')
                                else:
                                    Month = month
                                year = Date_time[2]
                                Final_Date = Date +(' ')+ Month + year
                                
                            elif len(Mon_Date) == 4:
                                Date = Mon_Date[1]
                                month = Mon_Date[2]
                                Month = datetime.datetime.strptime(month,'%b').strftime('%B')
                                year = Mon_Date[3]
                                Final_Date = Date +(' ')+ Month +(' ')+ year
                                
                else:
                    Final_Date = 'None'

                #location fetching
                location_div = desc_soup.findAll('div', class_='event-details__data')              
                if len(location_div) > 0:
                    location_tags = location_div[1].findAll('p')
                    locat = location_tags[0].text                    
                    location = locat +(' ')+ "Dublin"
                else:
                    location = 'Dublin'


                ordinates = getOrdinates(location)

                try:
                    d1=datetime.datetime(int(year),int(month_string_to_number(Month)),int(Date))
                except:
                    continue

                d2 = datetime.datetime.now()


                if d1>d2:
                    data = EventData()

                    data.id = uuid.uuid1().__str__()
                    data.title = title
                    data.time = ''
                    data.location = location
                    data.summary = description
                    data.img = image
                    data.category = category
                    data.startdate = Final_Date
                    data.read_more = read_more
                    data.enddate = ''
                    data.price = Price
                    data.address = ordinates[2]
                    data.latitude = ordinates[0]
                    data.longitude = ordinates[1]                     
                    data_list.append(data)
                    i = i+1

            # print(len(data))

        print(len(data_list))
        return data_list