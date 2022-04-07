import billboard
from numpy import NaN 
import spotipy
import spotipy.util as util 
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy.orm import Session
from sqlalchemy import update, text
from . import models, crud
from datetime import datetime, timedelta
import numpy as np

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="737f07244f3e435d9a3485e71acdceb7", client_secret="a49eef30bab647e8aa36e4c20c4835e3"))


## Returns an array of all artists in the Billboard Global 200 for a given date
def extract_chart(date):
    chart = billboard.ChartData("billboard-200", date)
    return chart

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
    for rank, entry in enumerate(chart.entries):
     
        artist_dict = retrieve_artist_data(entry.artist)
        if artist_dict != 'None' and artist_dict['genres'] and artist_dict['images'] and artist_dict['images'][0]['url']:
 
            new_db_item = models.RawData(
                artist_name = artist_dict['name'],
                date = date,
                rank = rank + 1,
                external_url =  artist_dict['external_urls']['spotify'],
                number_of_followers = artist_dict['followers']['total'],
                genre = artist_dict['genres'][0],
                image_url = artist_dict['images'][0]['url'],
                )

            print("Saving " + str(new_db_item) + "to database")
            crud.create_raw_data(db, new_db_item)

    ## Build the main tables

def populate_database_all(db: Session):
    for year in range(2):
        for month in range(1,13,1):
            if month < 10:
                month = f"0{month}"
            date = f"{2020+year}-{month}-01"
            populate_database(db, date)


def get_all(db: Session):
    ## function that transforms the manipulated Data table to pandas dataframe
    ## function that calculates the trend, based on growth compared to previous month
    return db.query(models.ManipulatedData).all()


def get_all_enhanced(db: Session):

    ## function that transforms the manipulated Data table to pandas dataframe
    ## function that calculates the trend, based on growth compared to previous month
    return db.execute(text(
        """
        with cte as (select date, genre, rank_aggregate,image_url,
        lag(rank_aggregate,1) over (partition by genre order by date) previous_rank_aggregate,
        date_part('month', AGE(MIN(date), LEAD(MIN(date)) OVER (PARTITION BY genre ORDER BY date DESC))) as diff_months
        from public.manipulated_data
        GROUP BY date, genre,rank_aggregate,image_url
        order by date desc, rank_aggregate desc)
        SELECT date, genre, rank_aggregate, previous_rank_aggregate,
        ((rank_aggregate-previous_rank_aggregate)/NULLIF(previous_rank_aggregate,0))/NULLIF(diff_months,0) * 100 as growth,
        image_url
        from cte 
        order by date desc
        """
        )).all()


def get_image(db, genre):
    genre_list = db.query(models.RawData).filter(models.RawData.genre == genre).all()
    return(genre_list[0].image_url)

def save_genres(db):
    genre_query = db.query(models.ManipulatedData.genre).all() ## returns a list of all rows, displaying the genre
    all_genres_array = np.unique(genre_query) ## returns a list of the unique genres

    for index, genre in enumerate(all_genres_array):
        new_db_item = models.Genre(
        id = index,
        genre = genre,
        image_url = get_image(db, genre),
        )
        print("Saving " + str(new_db_item) + "to database")
        crud.create_genre(db, new_db_item)
 
def save_images(db):

    all_data_query = db.query(models.ManipulatedData).all()
    model = models.ManipulatedData
    
    for index, x in enumerate(all_data_query):

        image_url = db.query(models.Genre.image_url).where(models.Genre.genre == x.genre).all()[0]
        
        db.execute(update(model).where(model.id == x.id).values({'image_url' : str(image_url[0])}))
        db.commit()







   




               

    


    
