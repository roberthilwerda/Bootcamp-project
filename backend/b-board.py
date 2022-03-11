import billboard 
###import spotipy
chart = billboard.ChartData('hot-100')

rock_genre = []
pop_genre = []
jazz_genre =[]

if chart.artist in billboard.ChartData('rock-songs'):
    rock_genre.append(chart.artist)
elif chart.artist in billboard.ChartData('pop-songs'):
    pop_genre.append(chart.artist)
elif chart.artist in billboard.ChartData('jazz-genre'):
    jazz_genre.append(chart.artist)
print(rock_genre)
print(pop_genre)

###print(chart[0].artist)
