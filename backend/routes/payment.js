
const router = require("express").Router();

router.post("/", async (req, res) => {

    try {
        console.log(req.body);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;