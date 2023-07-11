const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql");

router.get("/circuits", async (req, res) => {
  const query = "SELECT * FROM circuits";

  mysql.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    return res.json(result);
  });
});

router.get("/circuits/:name", (req, res) => {
  const query = "SELECT * FROM circuits WHERE circuitRef = ?";

  mysql.query(query, [req.params.name], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json(result);
  });
});

router.get("/:year/circuits", (req, res) => {
  const query = `SELECT c.*
                FROM circuits c
                JOIN races r ON r.circuitId = c.circuitId
                WHERE r.year = ?`;

  mysql.query(query, [req.params.year], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json(result);
  });
});

router.get("/:year/:round/circuits", (req, res) => {
  const query = `SELECT c.*
                FROM circuits c
                JOIN races r ON r.circuitId = c.circuitId
                WHERE r.year = ? AND r.round = ?`;

  mysql.query(query, [req.params.year, req.params.round], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json(result);
  });
});

module.exports = router;
