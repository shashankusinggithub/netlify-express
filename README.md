# Movie Search App

#### Search For Your Favorite Movie
Project in action - [MovieSearchApp](https://intense-headland-96312.herokuapp.com/)

#### Run The App Locally

```sh
npm run install-dependencies
```

- create file .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME

```sh##
npm start
```

- visit url http://localhost:3000/


### Setup Server

- stop the dev server in client
- cd ..
- start setting up our server
- setup package.json

```sh
npm init -y
```

- create server.js
- console.log('server running...')

```sh
node server
```

#### ES6 vs CommonJS

```js
CommonJS

const express = require('express')
const app = express()
```

```js
ES6

import express from 'express'
const app = express()
```

- file extension .mjs

```js
package.json

"type":"module"
```

#### Nodemon and Basic Express Server

```sh
npm install nodemon --save-dev
```

```js
package.json

"start":"nodemon index"

```

```sh
npm install express
```

```js
import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Welcome!')
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is listening on port ${port}...`))
```

#### Authentication Middleware

- in the root create <b>middleware</b> folder
- AuthMiddleware.js
- setup function
- return status 401 with message 'Not authorized'
- export as protect 
- import in index.js   \\\\\\\ rename

```js
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { User } = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization
  ) {
    try {
      // Get token from header      
      token = req.headers.authorization
      // Verify token
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)
      // Get user from the token
      req.user = await User.findById(decoded._id)      
      next()

    } catch (error) {
      console.log(error)
      res.status(500)
      throw new Error('Internal Server Error')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }

```



#### Fletch Middleware

- create fletchMiddleware.js <b>middleware</b> folder
- setup function
- return status 401 with message 'Not authorized' if playlist id private
- export as fletch 
- import in index.js    \\\\\\\ rename


```js

const asyncHandler = require('express-async-handler')
const {Playlist} = require("../models/playlist")

const fletch = asyncHandler(async (req, res, next) => { 
  {
    try {
      
      // Get user from the token
      req.playlist = await Playlist.findById(req.params.id)
      

      // check if user exists
      if (req.playlist.private === true){
        res.status(401)
        throw new Error('Not authorized')
      }      
      next()
      
    } catch (error) {
      console.log(error)
      res.status(500)
      throw new Error('Internal Server Error')
    }
  }})
module.exports = { fletch }
```























#### Setup React App

- create <b>client</b> folder
- open terminal

```sh
cd client
```

```sh
npx create-react-app .
```

```sh
npm start
```

- set editor/browser side by side
- copy/paste assets from complete project

#### Spring Cleaning

- in src remove
- App.css
- App.test.js
- logo.svg
- reportWebVitals.js
- setupTests.js
- fix App.js and index.js

#### Title and Favicon

- change title in public/index.html
- replace favicon.ico in public
- resource [Generate Favicons](https://favicon.io/)

#### React Router

- Version 6
- [React Router Docs](https://reactrouter.com/docs/en/v6)

```sh
npm install history@5 react-router-dom@6
```

- import three components

```js
import { Route, Routes, Navigate } from "react-router-dom";
```

- Connect to browser's URL with BrowserRouter
- Routes instead of Switch

```js
    <Routes className="body">
			{user && <Route path="/" exact element={ <Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/playlistuser/:id" element={ <Dashboard />} />
			<Route path="/playlists" element={ <Playlist />} />			
	</Routes>
```

### Setup Pages

- create Dashboard, Login, Main, Signup, Playlist,
- create  Searchbox,  Playlistbox, MovieList, Movie for importing them into Main

#### Login

- Page to login for registered users which authenticates the input details entered and stores a token data into the local storage
- Optimized for Mobile View
```js


```


#### Register

- Page to register for new users which the input details wo the backend server and checkes if you email already exists and then updates the data into the backend server
- Optimized for Mobile View

```js


```

#### Main 

- Page created to redirect user to this page if loggedin
- This page contails element called Movies and navigtion element which navigates to playlists and a logout button to logout

```js
import Movie from "../Movie";

```

#### Playlist

- Playlist contails all the playlists created by user posters undeer it with options to delete the playlist or delete movies from the playlist

```js

```


#### Movie

- this element consists of search bar which updates the value and calls the api for updated list of movies with keywords

```js


```


#### MovieList

- MovieList element consists of all list of movie posters and functions to add or remove from playlist including create playlist

```js

```

#### Playlistbox

- Playlistbox contails all the playlists created by user and a text input to create a new playlist

```js

```



#### Dashboard 

- page created to view shared playlist
- user can his sharable link to others and it will be drected to Dashboard

```js


```

