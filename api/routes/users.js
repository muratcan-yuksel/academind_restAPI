const express = require("express");
const router = express.Router();

const { signup, getUsers, login, deleteUser } = require("../controllers/users");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUsers);
router.delete("/:userId", deleteUser);

module.exports = router;
