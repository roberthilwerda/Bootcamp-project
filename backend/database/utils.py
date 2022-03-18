import billboard
from numpy import NaN 
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
from datetime import datetime, timedelta

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="737f07244f3e435d9a3485e71acdceb7", client_secret="a49eef30bab647e8aa36e4c20c4835e3"))

## Define date here
date = "2021-04-04"

## Returns an array of all artists in the Billboard Global 200 for a given date
def extract_artists():
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

print(len(extract_artists()))


## Returns the artist and its related data of a search on Spotify 
def retrieve_artist_data(artist_name):
    results = sp.search(q = artist_name, limit=3, type ='artist') ## object
    
    result = results['artists']['items']
    if len(result) == 0:
        return 'None'
    else: 
        return result


## Returns the final data object that is used to populate the database
def get_chart_data():
    artists = extract_artists()
    artists = list(set(artists)) # to remove duplicate data
    final_data = []
    for artist in artists:
        artist_data = retrieve_artist_data(artist)
        if artist_data != 'None':
            dict_new = {}
                
            if artist_data[0]['external_urls']['spotify']:
                dict_new['external_urls'] = artist_data[0]['external_urls']['spotify']

            if artist_data[0]['followers']['total']:   
                dict_new['followers'] = artist_data[0]['followers']['total']

            if artist_data[0]['genres']:
                dict_new['genres'] = artist_data[0]['genres'][0]

            if artist_data[0]['href']:
                dict_new['href'] = artist_data[0]['href']

            if artist_data[0]['images']:
                dict_new['images'] = artist_data[0]['images'][0]

            if artist_data[0]['name']:
                dict_new['name'] = artist_data[0]['name']

            if artist_data[0]['popularity']:
                dict_new['popularity'] = artist_data[0]['popularity']
                
            final_data.append(dict(dict_new))
                    
    return final_data

def get_chart_data():
    artists = extract_artists() ## extract artists from billboard
    artists_data = [retrieve_artist_data(artist) for artist in artists] ## array of objects from Spotify
    artists_data_clean = [] ## remove none values
    final_data = []

    # main_artist_list = []
    
    for artist in artists_data:
        if artist != 'None':
            artists_data_clean.append(artist)

    for artist in artists_data_clean:
        dict_new = {}
            
        if artist[0]['external_urls']['spotify']:
            dict_new['external_urls'] = artist[0]['external_urls']['spotify']

        if artist[0]['followers']['total']:   
            dict_new['followers'] = artist[0]['followers']['total']

        if artist[0]['genres']:
            dict_new['genres'] = artist[0]['genres'][0]

        if artist[0]['href']:
            dict_new['href'] = artist[0]['href']

        if artist[0]['images']:
            dict_new['images'] = artist[0]['images'][0]

        if artist[0]['name']:
            dict_new['name'] = artist[0]['name']

        if artist[0]['popularity']:
            dict_new['popularity'] = artist[0]['popularity']
            
        final_data.append(dict(dict_new))
                
    return final_data



     