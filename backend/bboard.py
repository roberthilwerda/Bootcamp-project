import billboard 

def extract_artists():
    charts = billboard.ChartData("billboard-global-200")
    return [chart.artist for chart in charts]
