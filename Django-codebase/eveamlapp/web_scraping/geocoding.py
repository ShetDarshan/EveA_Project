import geopy as nom
from geopy.geocoders import Nominatim
from geopy.distance import great_circle

def getOrdinates(address):
    locator = nom.Nominatim(user_agent= "eba7f5230f2a6888e75a8a19573a4241f4cd1987")
    geolocator = Nominatim(timeout=3)
    location = locator.geocode(address)
    if location is None:
        return getOrdinates("Dublin")
    else:
        return location.latitude , location.longitude, location.address

def getDistance(srcLatitude, srcLongitude, destLatitude, destLongitude):
    src = (float(srcLatitude), float(srcLongitude))
    dest = (float(destLatitude), float(destLongitude))

    return great_circle(src, dest).meters




