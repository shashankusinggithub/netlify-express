require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const path =require("path");

// database connection
const connection = require("./db");
connection();

// all Routs
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const playlistAdd = require("./routes/playlistadd.js")
const playlistDel = require("./routes/playlistdel.js")
const selfPlaylist = require("./routes/playlist")
const privatePlaylist = require("./routes/private")
const OthersPlaylist = require("./routes/userplaylist");
const { response } = require("express");


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/playlistadd",  playlistAdd)
app.use("/playlistdel",  playlistDel)
app.use('/playlist/', selfPlaylist)
app.use('/pvt/', privatePlaylist)
app.use('/pvt/', privatePlaylist)
app.use("/userplaylist/", OthersPlaylist)


if (process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, console.log(`Listening on port...`))