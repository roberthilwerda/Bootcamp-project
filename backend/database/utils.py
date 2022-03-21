import billboard
from numpy import NaN 
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy.orm import Session
from . import models, crud
from datetime import datetime, timedelta

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="737f07244f3e435d9a3485e71acdceb7", client_secret="4f590cc8caec4cbcbc4c88d7febcbe31"))


## Returns an array of all artists in the Billboard Global 200 for a given date
def extract_chart(date):
    chart = billboard.ChartData("billboard-200", date)
    return chart


# ## Returns the artist and its related data of a search on Spotify 
# def retrieve_artist_data(artist_name):
#     try:
#         results = sp.search(q = artist_name, limit=3, type ='artist') ## object
#     except:
#         return 'None'
    
#     spotify_item = results['artists']['items']

#     if len(spotify_item) == 0:
#         return 'None'

#     else: 
#         return spotify_item[0]





def populate_database(db: Session, date=datetime.today().strftime('%Y-%m-%d')):
    ##extract chart for given date
    chart = extract_chart(date)
    print(sp.search(q = "Queen", type ='artist'))
  
    ##for every artist, retrieve spotify data
    for entry in chart.entries:
        
        artist_dict = retrieve_artist_data(entry.artist)
       
        if artist_dict != 'None' and artist_dict['genres'] and artist_dict['images'][0]['url']:
 
            new_db_item = models.RawData(
                artist_name = artist_dict['name'],
                date = date,
                external_url =  artist_dict['external_urls']['spotify'],
                number_of_followers = artist_dict['followers']['total'],
                genre = artist_dict['genres'][0],
                image_url = artist_dict['images'][0]['url'],
                )

  
#     ##for every artist, retrieve spotify data
#     for entry in chart.entries:
        
#         artist_dict = retrieve_artist_data(entry.artist)
        
#         if artist_dict != 'None' and artist_dict['genres'] and artist_dict['images'][0]['url']:
 
#             new_db_item = models.RawData(
#                 artist_name = artist_dict['name'],
#                 date = date,
#                 external_url =  artist_dict['external_urls']['spotify'],
#                 number_of_followers = artist_dict['followers']['total'],
#                 genre = artist_dict['genres'][0],
#                 image_url = artist_dict['images'][0]['url'],
#                 )

#             print("Saving " + str(new_db_item) + "to database")
#             crud.create_raw_data(db, new_db_item)

def populate_database_all(db: Session):
    for year in range(1):
        for month in range(1,13,1):
            if month < 10:
                month = f"0{month}"
            date = f"{2021+year}-{month}-01"
            populate_database(db, date)


def get_all(db: Session):
    return db.query(models.RawData).all()

               

    


    
