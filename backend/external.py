from bboard import extract_artists
from spotipyapi import retrieve_artist


def get_genres():
    artists = extract_artists()
    artists_jsons = [retrieve_artist(artist) for artist in artists]
    sub_artist_list = []
    main_artist_list = []
    for outer_list in artists_jsons:
        if outer_list != 'nothing':
            sub_artist_list.append(outer_list)
            for artist in sub_artist_list:
                dict_new = {}
                dict_new['external_urls'] = artist[0]['external_urls']['spotify']
                dict_new['followers'] = artist[0]['followers']['total']
                dict_new['genre'] = artist[0]['genres'][0]
                dict_new['href'] = artist[0]['href']
                dict_new['images'] = artist[0]['images'][0]
                dict_new['name'] = artist[0]['name']
                dict_new['popularity'] = artist[0]['popularity']
                
            main_artist_list.append(dict(dict_new))

    return main_artist_list

    
