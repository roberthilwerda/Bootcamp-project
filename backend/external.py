import json
from bboard import extract_artists
from spotipyapi import retrieve_artist


def get_genres():
    artists = extract_artists()
    artists_jsons = [retrieve_artist(artist) for artist in artists]
    return artists_jsons

all_dict = get_genres()
for dict in all_dict:
    json_converter = json.loads(json.dumps(all_dict))
    print(json_converter)
