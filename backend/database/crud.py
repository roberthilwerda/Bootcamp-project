from numpy import array
from sqlalchemy.orm import Session
from . import models, schemas


# def create_genre(db: Session, genre: models.Genre):
#     # create Genre instance with your data
#     db.add(genre)
#     db.commit()
#     db.refresh(genre)


# def update_genres(db: Session):
#     print("UPDATING GENRES")
#     # replace this array with the data from the API
#     genres = ["Rock", "Jazz", "Blues"]
#     response = []

#     for x in genres:

#         db_item = models.Genre(name=x)  # create Genre instance with your data
#         db.add(db_item)
#         response.append({'name': db_item.name})
#         db.commit()
#         db.refresh(db_item)

#     return response

def get_all_genres(db: Session):
    genres = db.query(models.Genre).all()
    return [str(genre) for genre in genres]

def create_raw_data(db:Session, item):
    db.add(item)
    db.commit()
    db.refresh(item)




