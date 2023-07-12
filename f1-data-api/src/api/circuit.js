const express = require("express");
const router = express.Router();
const mysql = require("../database/mysql");
const DEFAULT_QUERY_LIMIT = 30;

router.get("/circuits", async (req, res) => {
  const query = `SELECT *
                FROM circuits
                LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  mysql.query(query, [queryLimit], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json(result);
  });
});

router.get("/circuits/:name", (req, res) => {
  const query = `SELECT *
                FROM circuits
                WHERE circuitRef = ?
                LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  mysql.query(query, [req.params.name, queryLimit], (err, result) => {
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
                WHERE r.year = ?
                LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  mysql.query(query, [req.params.year, queryLimit], (err, result) => {
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
                WHERE r.year = ? AND r.round = ?
                LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  mysql.query(query, [req.params.year, req.params.round, queryLimit], (err, result) => {
    if (err) {
      throw err;
    }

    return res.json(result);
  });
});

module.exports = router;
