const router = require("express").Router();
const { User } = require("../models/user");  
const {protect} = require("../middleware/authMiddleware")


// delete item in the play list 
router.put("/", protect , async (req, res ) => {    
	try {
        		
		if (!req.user){
			return res.status(401).send({ message: "Invalid Email or Password" });
		
		}
			const newlist = req.user		
			const templist = newlist.favorite.filter(
				(favourite) => favourite.imdbID !== req.body.imdbID
			);
			newlist.favorite = templist
			const updated = await User.findByIdAndUpdate(req.user.id, newlist)
			
			res.status(200).send({message: "Successfully changed"})
				
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;

