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
            print(title)
            read_more = event.find_all('a', {"class": "calendarImageLink"})[0]["data-link-url"]
            try:
                image = event.find_all('a', {"class": "calendarImageLink"})[0].img["src"]
            #         print(image)
            except:
                image = 'None'
            if image.endswith(".jpg") | image.endswith(".png"):
                image = image
            else:
                image = 'None'

            date = event.em.text

            start_date = date.split('through')[0].strip()
            Year1 = start_date.split(',')[1].strip()
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

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.img = image
            data.startdate = start_date
            data.enddate = end_date
            data.summary = desc
            data.time = my_dict["Time:"]
            data.location = my_dict["Location:"]
            #data.address = my_dict["Address:"]
            data.read_more = read_more
            try:
                data.price = my_dict["Price:"]
            except:
                data.price = "SEE DESCRIPTION"
            data.category = my_dict["Category:"]
            data_list.append(data)


        print(len(data_list))
        return data_list