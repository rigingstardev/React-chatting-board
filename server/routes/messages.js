const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const messagesController = require("../controllers/messagesController");

const auth = require("../middlewares/auth");

router.get(
  "/:channelId",
  auth,
  catchErrors(messagesController.getAllMessagesInChannel)
);

router.get(
  "/private/:fromUser",
  auth,
  catchErrors(messagesController.getAllDirectMessage)
);

router.get(
  "/read/:id",
  auth,
  catchErrors(messagesController.readChannelMessage)
);

router.patch(
  "/read/private/:id",
  auth,
  catchErrors(messagesController.readDirectMessage)
);

module.exports = router;
