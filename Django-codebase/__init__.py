import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("evea-prj-firebase-adminsdk-xgpyn-eba7f5230f.json")
firebase_admin.initialize_app(cred)