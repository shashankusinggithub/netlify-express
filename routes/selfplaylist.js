const router = require("express").Router();
const { Playlist } = require("../models/playlist.js");
const { protect } = require("../middleware/authMiddleware");
const { User } = require("../models/user.js");

// Route to send users self playlist

router.get("/getlist", protect, async (req, res) => {
  try {
    // console.log("getlist")
    if (!req.user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    // getting list of ids and names

    res.status(200).send(req.user.playlists);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/addtoplaylist", async (req, res) => {
  try {
    // if (!req.user) {
    //     return res.status(401).send({ message: "Invalid Email or Password" });
    // }
    // sending list of ids and names
    // console.log(req.body, "hiuhi");

    const updated = await Playlist.findByIdAndUpdate(req.body.playid, {
      $addToSet: { playlist: req.body.movie },
    });
    res.status(200).send({ msg: "added" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/removefromplaylist", async (req, res) => {
  try {
    // if (!req.user) {
    //     return res.status(401).send({ message: "Invalid Email or Password" });
    // }
    // sending list of ids and names

    const updated = await Playlist.findByIdAndUpdate(req.body.playid, {
      $pull: { playlist: req.body.movie },
    });

    console.log(updated);

    res.status(200).send({ msg: "deleted movie from playlist" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// adds creates the
router.post("/createplaylist", protect, async (req, res) => {
  // creating playlist
  const result = await new Playlist({
    name: req.body.name,
    userID: req.user.id,
  }).save();
  const Array = await Playlist.findByIdAndUpdate(result.id, {
    $push: { playlist: req.body.movie },
  });

  //adding id to list of playlist
  const updated = await User.findByIdAndUpdate(req.user.id, {
    // $pop: { playlists: 1
    $push: { playlists: { value: result.id, label: req.body.name } },
  });
  console.log("added");
  res.status(200).send({ msg: "added" });
});

router.post("/delplaylist", protect, async (req, res) => {
  // // Deleting playlist
  const playlistname = await Playlist.findByIdAndRemove(req.body.playlistid);
  console.log(playlistname);

  // delteting list from ueer playlists array
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { playlists: { value: playlistname.id, label: playlistname.name } },
  });
  console.log("deleteed");

  res.status(200).send({ msg: "deleted playlist" });
});

router.put("/private", async (req, res) => {
  try {
    // sending list of ids and names

    const toggle = !req.body.private;
    await Playlist.findByIdAndUpdate(req.body.playlistid, { private: toggle });
    res.status(200);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/movieslist", protect, async (req, res) => {
  try {
    // console.log("tried")
    const details = req.user.playlist;
    const movieslist = await Playlist.find({ userID: req.user.id });
    // console.log(movieslist)
    res.status(200).send(movieslist);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
