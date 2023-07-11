const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql");

router.get("/circuits", async (req, res) => {
  mysql.query("SELECT * FROM circuits", (err, result) => {
    return res.json(result);
  });
});

module.exports = router;
