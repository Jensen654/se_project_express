const router = require("express").Router();

const { getCurrentUser, updateUserProfile } = require("../controllers/user");
const { updateUserValidator } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", updateUserValidator, updateUserProfile);

module.exports = router;
