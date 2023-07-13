const express = require("express");
const router = express.Router();
const db = require("../database/mysql");
const DEFAULT_QUERY_LIMIT = 30;

router.get("/circuits", async (req, res) => {
  const queryString = `SELECT *
                      FROM circuits
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const circuits = await db.query(queryString, [queryLimit]).catch((err) => {
    throw err;
  });

  return res.json(circuits);
});

router.get("/circuits/:name", async (req, res) => {
  const queryString = `SELECT *
                      FROM circuits
                      WHERE circuitRef = ?`;

  const circuits = await db.query(queryString, [req.params.name]).catch((err) => {
    throw err;
  });

  return res.json(circuits);
});

router.get("/:year/circuits", async (req, res) => {
  const queryString = `SELECT c.*
                      FROM circuits c
                      LIMIT ?
                      JOIN races r ON r.circuitId = c.circuitId
                      WHERE r.year = ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const circuits = await db.query(queryString, [req.params.year, queryLimit]).catch((err) => {
    throw err;
  });

  return res.json(circuits);
});

router.get("/:year/:round/circuits", async (req, res) => {
  const queryString = `SELECT c.*
                      FROM circuits c
                      JOIN races r ON r.circuitId = c.circuitId
                      WHERE r.year = ? AND r.round = ?`;

  const circuits = await db.query(queryString, [req.params.year, req.params.round]).catch((err) => {
    throw err;
  });

  return res.json(circuits);
});

module.exports = router;
