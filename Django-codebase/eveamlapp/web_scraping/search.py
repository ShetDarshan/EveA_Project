from fuzzywuzzy import fuzz
from .service import DataProcess
from .models import EventData
from google.cloud import firestore

class Search:
    @staticmethod
    def searchtry(user_input):

        events = list()
        events = DataProcess.getevents()
        print(len(events))
        #user_input = raw_input("Enter your name : ")
        str2Match = user_input
        
        output_list = list()
        i = 0    
        for item in events:
            
            var1 = item.title
            ratio = fuzz.token_sort_ratio(var1.lower(),str2Match.lower())
            #print(ratio)
            if ratio >  4:
                i=+1
                output_list.append(item)

        print(i)
        return output_list