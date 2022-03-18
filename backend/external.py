from bboard import extract_artists
from spotipyapi import retrieve_artist


def get_genres():
    artists = extract_artists()
    artists_jsons = [retrieve_artist(artist) for artist in artists]
    sub_artist_list = []
    # main_artist_list = []
    sub_main_artist_list = []
    prep_artist_list = []
    for outer_list in artists_jsons:
        if outer_list != 'nothing':
            sub_artist_list.append(outer_list)
            for artist in sub_artist_list:
                dict_one = {}
                dict_one['external_urls'] = artist[0]['external_urls']['spotify']
                dict_one['followers'] = artist[0]['followers']['total']
                dict_one['genres'] = artist[0]['genres']
                dict_one['href'] = artist[0]['href']
                dict_one['images'] = artist[0]['images'][0]
                dict_one['name'] = artist[0]['name']
                dict_one['popularity'] = artist[0]['popularity']

            prep_artist_list.append(dict(dict_one))

                




    return(prep_artist_list)

print(get_genres())

    