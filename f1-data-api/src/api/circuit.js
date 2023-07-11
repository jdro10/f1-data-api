const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql");

router.get("/circuits", async (req, res) => {
  mysql.query("SELECT * FROM circuits", (err, result) => {
    return res.json(result);
  });
});

router.get("/circuits/:name", (req, res) => {
  mysql.query(
    "SELECT * FROM circuits WHERE circuitRef = ?",
    [req.params.name],
    (err, result) => {
      if (err) {
        throw err;
      }

      return res.json(result);
    }
  );
});

module.exports = router;
