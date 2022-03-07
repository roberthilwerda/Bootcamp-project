from fastapi import Depends
from Class import Artist, Test
from spotipyapi import retrieve_artist
from database_connection import SessionLocal, Base, engine
import json

all_dict = retrieve_artist('linkin park')
artists_dict = json.loads(json.dumps(all_dict))
artists_object = Artist(**artists_dict)

test = Test(id = 100)


Base.metadata.create_all(bind = engine)
db = SessionLocal()

db.add(test)
db.commit()

