from fastapi import FastAPI
import billboard 

app = FastAPI()

@app.get('/top100')
def top_100():
    chart = billboard.ChartData('hot-100')
    return str(chart)
