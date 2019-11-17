from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re

from eveamlapp.web_scraping.models import EventData


class dublincity:

    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()

        # Finding each events
        page_soup = soup(page_html, "html.parser")

        # Finding each events
        events_today = page_soup.find_all('div',class_="calendarEventsBlockWrap")
        events = events_today[0].find_all('div', class_= "event-item clearfix")
        #print(events_today)

        for event in events:
            title = event.h3.a["title"]
<<<<<<< HEAD
            print(title)
            read_more = event.find_all('a', {"class": "calendarImageLink"})[0]["data-link-url"]
            try:
                image = event.find_all('a', {"class": "calendarImageLink"})[0].img["src"]
=======
            #print(title)
            read_more = event.find_all('a', {"class": "calendarImageLink"})[0]["data-link-url"]
            try:
                image = event.find_all('a',{"class":"calendarImageLink"})[0]['href']
>>>>>>> master
            #         print(image)
            except:
                image = 'None'
            if image.endswith(".jpg") | image.endswith(".png"):
                image = image
            else:
                image = 'None'

            date = event.em.text

            start_date = date.split('through')[0].strip()
<<<<<<< HEAD
            Year1 = start_date.split(',')[1].strip()
=======
            try:
                Year1 = start_date.split(',')[1].strip()
            except:
                Year1 = 'None'    
>>>>>>> master
            Date1 = start_date.split(',')[0].split(' ')[1]
            Month1 = start_date.split(',')[0].split(' ')[2]
            start_date = Date1 + " " + Month1 + " " + Year1

            end_date = date.split('through')[1].strip()
            Year2 = end_date.split(',')[1].strip()
            Date2 = end_date.split(',')[0].split(' ')[1]
            Month2 = end_date.split(',')[0].split(' ')[2]
            end_date = Date2 + " " + Month2 + " " + Year2

# # #        description
            desc = event.div.text.strip()

# # #       Time,location,price,address

            header = [elem.next for elem in event.find_all('strong')]
            header = header[1:]
            #     print(header)
            values = [elem.next.next for elem in event.find_all('strong')]
            values = values[1:]
            #     print(values)
            j = 0
            my_dict = {}
            for i in header:
                my_dict[i] = values[j].strip()
                j = j + 1
            category = my_dict["Category:"]
            if category=='Arts / Exhibits' or category=='Comedy' or category=='Theatre / Dance':
                category='FASHION, ART & THEATRE'
                if category == 'FASHION, ART & THEATRE' and image == 'None':
                    image = 'https://4.bp.blogspot.com/-haQkpIywgPA/W5L1p-6P5JI/AAAAAAAANv4/279R0n1im_MugfsnYTlbf5ZiTaG2s7NYQCLcBGAs/s1600/Six_photoby_IdilSukan_18.jpg'
            elif category=='Business Networking' or category=='Canvention / Conference' or category=='Educational' or category=='Expo':
                category='EDUCATION, BUSINESS & TECHNOLOGY'
                if category == 'EDUCATION, BUSINESS & TECHNOLOGY' and image == 'None':
                    image = 'https://uindia.net/assets/img/MediaTechnology.jpg'
            elif category=='Concert / Live Music' or category=='Cultutal' or category=='Entertainment':
                category='MUSIC & ENTERTAINMENT'
                if category == 'MUSIC & ENTERTAINMENT' and image == 'None':
                    image = 'https://livestyle.com/wp-content/uploads/2017/07/slider-4.jpg'
            elif category=='Festival' or category =='Kids / Family':
                category = 'COMMUNITY & FESTIVALS'
                if category == 'COMMUNITY & FESTIVALS' and image == 'None':
                    image = 'https://www.totallydublin.ie/wp-content/uploads/2017/07/Just-Eat-Street.jpg'
            elif category ==' Health' or category =='Sports':
                category ='SPORTS & HEALTH'
                if category == 'SPORTS & HEALTH' and image == 'None':
                    image = 'https://previews.123rf.com/images/tnn103eda/tnn103eda1705/tnn103eda170500019/79377445-huge-multi-sports-collage-soccer-basketball-football-hockey-baseball-boxing-etc.jpg'
    

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.img = image
            data.startdate = start_date
            data.enddate = end_date
            data.summary = desc
            data.time = my_dict["Time:"]
            data.location = my_dict["Location:"] + my_dict["Address:"]
            #data.address = my_dict["Address:"]
            data.read_more = read_more
            try:
                data.price = my_dict["Price:"]
            except:
                data.price = "SEE DESCRIPTION"
            data.category = category
            data_list.append(data)


        print(len(data_list))
        return data_list