const { Router } = require("express");

const router = Router();

router.use("/users", require("./users.routes"));





module.exports = router;
