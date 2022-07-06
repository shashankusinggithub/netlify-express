const router = require("express").Router();  
const {protect} = require("../middleware/authMiddleware")

// Route to send users self playlist

router.get("/", protect,  async (req, res ) => {    
	try {		
		if (!req.user){
			return res.status(401).send({ message: "Invalid Email or Password" });}

        res.status(200).send(req.user.favorite)
				
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;
