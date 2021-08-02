const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/login", catchErrors(userController.login));
router.get("/me", auth, catchErrors(userController.me));
router.post("/signup", catchErrors(userController.register));
router.get("/:id", catchErrors(userController.getUser));
router.post("/forgot-password", catchErrors(userController.forgotPassword));
router.post("/password-reset/:userId/:token", catchErrors(userController.resetPassword));

module.exports = router;
