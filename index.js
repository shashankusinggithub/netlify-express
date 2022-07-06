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
const favoriteAdd = require("./routes/favoriteadd.js")
const favoriteDel = require("./routes/favoritedel.js")
const favorites = require("./routes/favorites")
const favoriteprivate = require("./routes/favoriteprivate")
const OthersFavorite = require("./routes/otherfavorite");
const { response } = require("express");
const selfPlaylist = require("./routes/selfplaylist")


app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/favoriteadd",  favoriteAdd)
app.use("/favoritedel",  favoriteDel)
app.use('/favorite', favorites)
app.use('/favoritepvt/', favoriteprivate)
app.use("/userplaylist/", OthersFavorite)
app.use("/selfplaylist", selfPlaylist )



if (process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, console.log(`Listening on port...`))