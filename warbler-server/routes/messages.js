const express = require("express");
// mergeParams allows us to access the id inside the router
const router = express.Router({ mergeParams: true });
const { createMessage } = require("../handlers/messages");

// we are going to use router.route insted of router.get()
// prefix /api/users/:id/messages (/:id mergeParams:true)
router.route("/").post(createMessage);

module.exports = router;
