import billboard 

def extract_artists():
    
    charts = billboard.ChartData("billboard-global-200", date = '2006-01-01' )
    return [chart.artist for chart in charts]

def isolate_artists(list):
    """
    This function loops through a list of artists and splits the string if it finds a devider.
    This function has to be nested inside itself to go seperate a multi collaboration.
    'Macklemore & Ryan Lewis Featuring Ray Dalton' -> raw
    ['Macklemore', 'Ryan Lewis Featuring Ray Dalton'] -> 1st run
    ['Macklemore', 'Ryan Lewis', 'Ray Dalton'] ->  2nd run

    Something still has to be added for '()' parentheses in 'Silk Sonic (Bruno Mars & Anderson .Paak)'

    """
    indiv_artists = []
    dividers = [' & ', ' Featuring ', ' X ', ' / ']
    for i in list:
        colab = False
        for devider in dividers:
            if devider in i:
                x = (i.split(devider))
                for a in range(len(x)):
                    indiv_artists.append(x[a])
                colab = True
                break
            else:
                continue
        if colab == False:
            indiv_artists.append(i)

    return indiv_artists