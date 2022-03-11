from sqlalchemy.orm import Session

from . import models, schemas

def create_artist(db: Session, artist: schemas.ArtistCreate):
    
    db_artist = models.Artist(name=artist.name)
    db.add(db_artist)
    db.commit()
    db.refresh(db_artist)
    return db_artist

