import imp
import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials
import json

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="5c054684e6e1465c8b90678a69e8985b", client_secret="3cc836959c214ae4b9ffb0afdd0a14d8"))




def retrieve_artist(name):  
    results = sp.search(q = name, limit =20, type ='artist')
##for idx, track in enumerate(results['tracks']['items']):
    ##print(idx, track['name'])

    return results['artists']['items'][0]
    ##print(results['artists']['items'][0].keys())

#retrieve_artist('linkin park')



# artists_object = Artist(**artists_dict)
# print(artists_object)


# # new
#     results = results['artists']['items'][0]
#     artists_dict = json.loads(json.dumps(results))
#     return artists_dict
