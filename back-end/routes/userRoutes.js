const express = require("express");
const { register,login } = require("../controllers/userController");

const router = express.Router();

router.post("/users", register); 
router.get("/users", login); 

module.exports = router;
