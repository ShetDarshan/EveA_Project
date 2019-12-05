import json
from algoliasearch.search_client import SearchClient

client = SearchClient.create("RPK4QHS3WC", "8fa8a55177bc1eae5c040bf3ca83f676")
indexEx = client.init_index("evea_events")


def addeventstoalgolia(events):
    print(len(events))
    jsonEvents = []
    print(indexEx)
    for event in events:

        obj = {'objectID': event.id, 'img': event.img, 'title': event.title, 'category': event.category,
               'latitude': event.latitude, 'longitude': event.longitude, 'startdate': event.startdate}
        r = json.dumps(obj)
        jsonR = json.loads(r)
        jsonEvents.append(jsonR)

    indexEx.save_objects(jsonEvents)


def deleteeventsalgolia(eventids):
    print(eventids)

    indexEx.delete_objects(eventids)
