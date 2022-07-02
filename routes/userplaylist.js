const router = require("express").Router();
const {fletch} = require("../middleware/fletchMiddleware") 


router.get("/:id", fletch,   async (req, res ) => {    
	try {
		if (!req.user){
			return res.status(401).send({ message: "Invalid UserID" });}
		
			const details = {
				user: req.user.firstName + ' ' + req.user.lastName,
				playlist : req.user.playlist
			}			
			res.status(200).send(details)		
				
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
