const express = require("express");
const router = express.Router();
const db = require("../database/mysql");
const DEFAULT_QUERY_LIMIT = 30;

router.get("/seasons", async (req, res) => {
  const queryString = `SELECT *
                      FROM seasons
                      ORDER BY year
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const seasons = await db.query(queryString, [queryLimit]).catch((err) => {
    throw err;
  });

  return res.json(seasons);
});

module.exports = router;
