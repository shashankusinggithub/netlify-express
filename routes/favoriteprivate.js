const router = require("express").Router();
const { User } = require("../models/user");
const { protect } = require("../middleware/authMiddleware")

router.put("/", protect, async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		// updating the plblic or private key
		const newl = req.user
		newl.favprivate = !newl.favprivate
		const updated = await User.findByIdAndUpdate(req.user.id, newl)
		const deliver = {
			id: newl.id,
			private: newl.favprivate
		}
		
		// sending the userplaylist  and id to search for 
		res.status(201).send(deliver)

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.get("/", protect, async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).send({ message: "Invalid Email or Password" });
		}

		const deliverraw = {
			id: req.user.id,
			favprivate: req.user.favprivate
		}
		res.status(201).send(deliverraw)

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
