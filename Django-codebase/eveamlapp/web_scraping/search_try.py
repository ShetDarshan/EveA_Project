from fuzywuzzy import process

from .models import EventData
from google.cloud import firestore

class Search:
    @staticmethod
    def searchtry(user_input):

        db = firestore.Client()
        titles = list()

        docs = db.collection(u'events_t').get()


        for doc in docs:
            data_Obj = EventData()
            if doc.exists:
                ev_Data = doc.to_dict()
                data_Obj.title = ev_Data['title']
                titles.append(data_Obj)
            else:
                print(u'No such document!!!')
        return titles

        #user_input = raw_input("Enter your name : ")
        str2Match = user_input
        strOptions = titles
        Ratios = process.extract(str2Match,strOptions, scorer=fuzz.token_set_ratio)
        print(Ratios)
        Ratios = dict(Ratios)

        output_list = []
        for item in Ratios.values():
            if item > 70:
                output_list.append(Ratios[item])
            return output_list
        events = EventData()

        for title in output_list:
            events = docs.where(u'capital', u'{}'.format(title)).get()


        return events










