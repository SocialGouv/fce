var express = require("express");
var router = express.Router();

router.post("/login", function(req, res) {
  let user = null;

  if (req.body && req.body.password) {
    switch (req.body.password) {
      case "D1r€cct€":
        user = {
          username: "user",
          isAdmin: false
        };
        break;

      case "@dm1nD1r€cct€":
        user = {
          username: "admin",
          isAdmin: true
        };
        break;
    }
  }
  res.send({
    user
  });
});

module.exports = router;
