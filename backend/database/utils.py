from cmath import nan
import billboard
from numpy import NaN 
import spotipy
import spotipy.util as util 
from spotipy.oauth2 import SpotifyClientCredentials
from sqlalchemy.orm import Session
from sqlalchemy import null, update, text
from . import models, crud, schemas
from datetime import datetime, timedelta
import numpy as np
from dotenv import load_dotenv
import os

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID, client_secret=SPOTIFY_CLIENT_SECRET))

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

def get_genre_detail(genre, db: Session):
    print(genre)
    return db.query(models.ManipulatedData).filter(
        models.ManipulatedData.genre == genre
    ).all()


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

def login_user(request_body: schemas.User, db: Session):
    user_id = request_body.user_id
    access_token = request_body.access_token
    query = db.query(models.User).filter(
        models.User.user_id == user_id
    ).first()

    ## If user does not exist yet
    if not query:
        db_user_item = models.User(
            user_id=user_id,
            name=request_body.name,
            email=request_body.email,
            picture_url=request_body.picture_url,
            access_token=request_body.access_token
        )
        db.add(db_user_item)

        try:
            db.commit()
            return schemas.User(
                user_id=user_id,
                name=request_body.name,
                email=request_body.email,
                picture_url=request_body.picture_url,
                access_token=request_body.access_token
            )
        except Exception as e:
            raise e
    ## If user exists, update accesstoken of the record
    else:
        item = schemas.UpdateAccessTokenSchema(
            access_token=access_token
        )

        db.query(models.User).filter(models.User.user_id == user_id).update({models.User.access_token: access_token})

        try:
            db.commit()

            return schemas.User(
                user_id=user_id,
                name=request_body.name,
                email=request_body.email,
                picture_url=request_body.picture_url,
                access_token=request_body.access_token
            )
        except Exception as e:
            print(e)
            raise e

def validate_user(user_id, access_token, db: Session):
    query = db.query(models.User
    ).filter(
        models.User.access_token == access_token
    ).filter(
        models.User.user_id == user_id
    ).first()

    return query

def logout(access_token, db: Session):

    item = schemas.UpdateAccessTokenSchema(
        access_token=access_token
    )
  
    db.query(models.User).filter(
        models.User.access_token == item.access_token
    ).update(
        {models.User.access_token: ""}, synchronize_session=False
    )

    try:
        db.commit()
    except Exception as e:
     
        print(e)
        raise e
    ##TODO: db.delete the accesstoken and user

    return("Successfully logged out")

    ##TODO  when a user visits '/' and is logged in, redirect to '/home'




 




   




               

    


    
