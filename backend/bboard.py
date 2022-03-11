import billboard 

def extract_artists():
    charts = billboard.ChartData("hot-100")
    return [chart.artist for chart in charts]
