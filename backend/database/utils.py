import billboard
from numpy import NaN 
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy.orm import Session
from . import models, crud
from datetime import datetime, timedelta

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="7094d2e6395648caa6183d9099a2bca6", client_secret="65f8b7ed69b94a7bbf02b4c91cb71617"))


## Returns an array of all artists in the Billboard Global 200 for a given date
def extract_chart():
    main_billboard = []
    billresults = []
    current_date = datetime.strptime('2010/01/01', '%Y/%m/%d')
    end_date = datetime.strptime('2021/12/31', '%Y/%m/%d')
    delta = timedelta(days=30)
    while current_date < end_date:
        ds = current_date.strftime('%Y-%m-%d')
        print(f'Fetching chart for {ds}')
        for ce in billboard.ChartData('billboard-200', date=ds):
            billresults.append([ce.artist])
        current_date += delta
    for values in billresults:
        main_billboard.extend(values)
    return main_billboard



## Returns the artist and its related data of a search on Spotify 
def retrieve_artist_data(artist_name):
    try:
        results = sp.search(q = artist_name, limit=3, type ='artist') ## object
    except:
        return 'None'
    
    spotify_item = results['artists']['items']

    if len(spotify_item) == 0:
        return 'None'

    else: 
        return spotify_item[0]



def populate_database(db: Session, date=datetime.today().strftime('%Y-%m-%d')):
    ##extract chart for given date
    chart = extract_chart(date)
  
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

            print("Saving " + str(new_db_item) + "to database")
            crud.create_raw_data(db, new_db_item)



       

               

    


    
