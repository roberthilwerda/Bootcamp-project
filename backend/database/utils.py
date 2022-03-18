import billboard
from numpy import NaN 
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy.orm import Session
from . import models


sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="737f07244f3e435d9a3485e71acdceb7", client_secret="a49eef30bab647e8aa36e4c20c4835e3"))


## Returns an array of all artists in the Billboard Global 200 for a given date
def extract_chart(date):
    chart = billboard.ChartData("billboard-global-200", date)
    return chart

## Returns the artist and its related data of a search on Spotify 
def retrieve_artist_data(artist_name):
    results = sp.search(q = artist_name, limit=3, type ='artist') ## object
    
    spotify_item = results['artists']['items']

    if len(spotify_item) == 0:
        return 'None'

    else: 
        return spotify_item[0]



def populate_database(db: Session, date):

    ##extract chart for given date
    chart = extract_chart(date)

    ##for every artist, retrieve spotify data
    for entry in chart.entries:
        artist_dict = retrieve_artist_data(entry.artist)
        
        if artist_dict != 'None':

            try:
                print(artist_dict['external_urls']['spotify'])
                new_db_item = models.RawData({
                    'artist_name': artist_dict['name'],
                    'external_url': artist_dict['external_urls']['spotify'],
                    'number_of_followers': artist_dict['followers']['total'],
                    'genre': artist_dict['genres'][0],
                    'image_url': artist_dict['images']['url'],
                })

                db.add(new_db_item)
                db.flush()

            except:
                pass
    db.commit()

    
