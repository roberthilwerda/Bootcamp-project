from numpy import array
from sqlalchemy import text
from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def get_popular_genres(db: Session, limit, date: datetime = datetime.today()):
    date = date.replace(day=1)
    date_string = date.strftime("%Y-%m-%d")
    genres = db.execute(text("""
        SELECT
            genre,
            MIN(date) as date,
            SUM(1/CBRT(raw_data.rank)) AS weighted_rank,
            LEAD(MIN(date)) OVER (PARTITION BY genre ORDER BY date DESC),
            LEAD(SUM(1/CBRT(raw_data.rank)), 1) OVER(
                PARTITION BY genre
                ORDER BY date DESC) AS previous_weighted_rank,
            date_part('month', AGE(MIN(date), LEAD(MIN(date)) OVER (PARTITION BY genre ORDER BY date DESC))) as diff_months
        FROM raw_data
        WHERE date <= :date
        GROUP BY date, genre
        ORDER BY date DESC, weighted_rank DESC
        LIMIT :limit"""), {"limit": limit, "date": date}).all()
    return genres

def get_genre_history(genre: str, db: Session):
    history = db.execute(text("""
        SELECT
	        date,
	        SUM(1/CBRT(raw_data.rank)) as rating
        FROM raw_data
        WHERE genre = :genre AND date >= CURRENT_DATE - interval '10 year'
        GROUP BY date
        ORDER BY date DESC
        """), {"genre": genre}).all()
    return history

def get_all_genres(db: Session):
    genres = db.query(models.Genre).all()
    return [str(genre) for genre in genres]

def create_raw_data(db:Session, item):
    db.add(item)
    db.commit()
    db.refresh(item)

def create_genre(db:Session, item):
    db.add(item)
    db.commit()
    db.refresh(item)



