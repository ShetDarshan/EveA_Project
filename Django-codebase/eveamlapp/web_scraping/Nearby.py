from .service import DataProcess
import pandas as pd
from .geocoding import getDistance

class Nearby:
    @staticmethod
    def eventsNearBy(title):
        nearByEvents = []
        def to_dict(x):
            return {"title": x.title, "time": x.time, "location": x.location, "summary": x.summary, "img": x.img,
                    "startdate": x.startdate, "enddate": x.enddate, "price": x.price, "read_more": x.read_more,
                    "category": x.category, "latitude": x.latitude, "longitude": x. longitude}

        # events = list()
        events = DataProcess.getevents()
        eventdicts = list(map(lambda x: to_dict(x), events))

        compareEvent = list(filter(lambda x: x.title == title, events))[0] 
        
        df = pd.DataFrame(eventdicts)

        dr = df[['title', 'latitude','longitude']]
        dr.set_index('title', inplace=True)
        dr['distance'] = ""

        for index, row in dr.iterrows():
            
            distance = getDistance(compareEvent.latitude, compareEvent.longitude,row['latitude'], row['longitude'])
            dr.set_value(index,'distance',distance)
            
        dr = dr.sort_values(by=['distance'])
        print(dr)
        
        indices = pd.Series(dr.index)
        
        top_10_titles = list(indices.iloc[1:11].index)

        for i in top_10_titles:
            nearByEvents.append(list(dr.index)[i])

        print(nearByEvents)
        
        return nearByEvents;    
            
            


