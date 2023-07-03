const { Router } = require("express");
const { userController } = require("../controllers/userController");
const router = Router();


router.post("/signup", userController.signUp);
router.post("/sendMail", userController.sendEmailWithCode);



module.exports = router;
