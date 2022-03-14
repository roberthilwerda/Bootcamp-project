import spotipy 
from spotipy.oauth2 import SpotifyClientCredentials

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id="737f07244f3e435d9a3485e71acdceb7", client_secret="a49eef30bab647e8aa36e4c20c4835e3"))

def retrieve_artist(name):
    results = sp.search(q = name, limit =20, type ='artist')
    result = results['artists']['items']
    if len(result) == 0:
        return 'nothing'
    else: 
        return result 
    
    
    



