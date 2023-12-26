const router = require("express").Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  loggedIn,
} = require("../controllers/userController");

const { requireAuth } = require("../middleware/requireAuth");

router.get("/getuser", requireAuth, getUser);
router.post("/createuser", createUser);
router.patch("/updateuser/:id", requireAuth, updateUser);
router.delete("/deleteuser/:id", requireAuth, deleteUser);
router.post("/login", loginUser);

module.exports = router;
