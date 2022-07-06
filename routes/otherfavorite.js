const router = require("express").Router();
const {fletch} = require("../middleware/fletchMiddleware") 


router.get("/:id", fletch,   async (req, res ) => {    
	try {
		if (!req.playlist){
			return res.status(401).send({ message: "Invalid UserID" });}
		
			const details = {
				name: req.playlist.name,
				playlist : req.playlist.playlist
			}			
			console.log(details)
			res.status(200).send(details)		
				
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
