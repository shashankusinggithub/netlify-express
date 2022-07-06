const router = require("express").Router();
const { Playlist } = require("../models/playlist.js");
const { protect } = require("../middleware/authMiddleware")
const { User } = require("../models/user.js")

// Route to send users self playlist

// router.get("/getlist", protect, async (req, res) => {
//     try {
//         console.log("getlist")
//         if (!req.user) {
//             return res.status(401).send({ message: "Invalid Email or Password" });
//         }
//         // getting list of ids and names
                
//         res.status(200).send(req.user.playlists)
//         console.log("getlist")
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

router.put("/addtoplaylist", async (req, res) => {
    try {
        // if (!req.user) {
        //     return res.status(401).send({ message: "Invalid Email or Password" });
        // }
        // sending list of ids and names
        console.log(req.body.value)

        const updated = await Playlist.findByIdAndUpdate(req.body.value,
            {
                $addToSet: { playlist: req.body.movie }
            })        
        res.status(200).send(updated)
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


// router.put("/removefromplaylist", async (req, res) => {
//     try {
//         // if (!req.user) {
//         //     return res.status(401).send({ message: "Invalid Email or Password" });
//         // }
//         // sending list of ids and names
//         const updated = await Playlist.findByIdAndUpdate(req.body.id,
//             {
//                 $pop: { playlist:   1}  //req.body.movie }
//             })        
//         res.status(200).send(updated)
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });


// // adds creates the
// router.post("/createplaylist", protect, async (req, res) => {
//     // creating playlist
//     const result = await new Playlist({name:req.body.name, userID: req.user.id}).save();   
//     const Array = await Playlist.findByIdAndUpdate(result.id,        
//         {
//             $push: { playlist: req.body.movie }
//         })   

//     //adding id to list of playlist
//     const updated = await User.findByIdAndUpdate(req.user.id, {
//         $push: { playlists: { value: result.id, label: req.body.name } }
//     })
//     res.status(200).send(req.user.id)
// })


// router.delete("/delplaylist", protect, async (req, res) => {
//     // Deleting playlist
//     await Playlist.findByIdAndRemove(req.body.userID)

//     // delteting list from ueer playlists array
//     await User.findByIdAndUpdate(req.user.id,{
//         $pull: { playlists: req.body }
//     })

    
//     res.status(200).send({msg: "deleted playlist"})
// })

// router.put("/private", async (req, res) => {
//     try {       
//         // sending list of ids and names
//         const plist = await Playlist.findById(req.body.id)
        
//         await Playlist.updateOne({id:req.body.id}, { private: !plist.private }
//         )     
//         res.status(200).send({ message: "pvt" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });


// router.get("/movieslist", protect, async (req, res)=>{
//     try{
//         console.log("tried")
//         const details = req.user.playlist
//         const movieslist = await Playlist.find({"userID":req.user.id}) 
//         console.log(movieslist)
//         res.status(200).send(movieslist)
//     }catch(error){
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// })
module.exports = router;