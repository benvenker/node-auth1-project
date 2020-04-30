const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(200).json({ saved });
    })
    .catch((err) => {
      res.status(500).json({ message: "Problem creating user", error: err });
    });
});

module.exports = router;
