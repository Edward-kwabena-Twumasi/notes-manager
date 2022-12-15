# Simple react notes taking app
Taking notes has now become easier. Hihi
# Tech stack
React,
Node,
Express,
Mongodb,

## User stories
Users can create a new note with a title and a body
see a list of all notes created on the application
Update notes
During updates a note, changes to the note should save as the user types
See when notes were created and last updated
Delete notes.
## How To Run
Create an Atlas URI connection parameter in `mern/server/config.env` with your Atlas URI:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT=5000
```

Start server:
```
cd front-and-back/server
npm install
npm start
```

Start Web server
```
cd front-and-back/client
npm install
npm start
```

