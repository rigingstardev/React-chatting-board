const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const userController = require("../controllers/userController");

router.post("/login", catchErrors(userController.login));
router.get("/me", catchErrors(userController.me));
router.post("/signup", catchErrors(userController.register));
router.get("/:id", catchErrors(userController.getUser));

module.exports = router;
