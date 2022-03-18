import billboard 

def extract_artists():
    
    charts = billboard.ChartData("billboard-global-200", date = '2020-01-01' )
    return [chart.artist for chart in charts]
print(extract_artists())