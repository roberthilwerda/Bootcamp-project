import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
import json



sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="5c054684e6e1465c8b90678a69e8985b", client_secret="f246bb057efc4f77a0415a4f1611bd29"))




def retrieve_artist(name):
    results = sp.search(q = name, limit =20, type ='artist')
    result = results['artists']['items']
    if len(result) == 0:
        return 'nothing'
    else: 
        return result[0]

print(retrieve_artist('linkin park'))