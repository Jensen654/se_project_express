const router = require("express").Router();

const {getCurrentUser, updateUserProfile} = require("../controllers/user");

router.get("/me", getCurrentUser);
router.patch("/me", updateUserProfile);

module.exports = router;
