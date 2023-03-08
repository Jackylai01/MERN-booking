const router = require("express").Router();
const authUser = require("../controllers/auth");

router.post("/register", authUser.register);
router.post("/login", authUser.login);

module.exports = router;
