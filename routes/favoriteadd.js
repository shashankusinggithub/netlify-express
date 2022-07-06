const router = require("express").Router();
const { User } = require("../models/user");  
const {protect} = require("../middleware/authMiddleware")


router.put("/", protect, async (req, res ) => {
	
	try {	
		const newl = req.user		
		newl.favorite = [...newl.favorite, req.body]
		console.log('tried')	
		const updated = await User.findByIdAndUpdate(req.user.id, newl)
		console.log('tried')
		res.status(200)		
		
		if (!res.user){
			return res.status(401).send({ message: "Invalid Email or Password" });}
				
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


module.exports = router;

