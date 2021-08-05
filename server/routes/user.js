const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/me", auth, catchErrors(userController.me));
router.get("/", auth, catchErrors(userController.getAllUsers));

router.post("/login", catchErrors(userController.login));
router.post("/signup", catchErrors(userController.register));
router.post("/forgot-password", catchErrors(userController.forgotPassword));
router.post("/password-reset/:userId/:token", catchErrors(userController.resetPassword));
router.get("/:id", catchErrors(userController.getUser));


module.exports = router;