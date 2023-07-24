const express = require("express");
const router = express.Router();
const db = require("../database/mysql");
const DEFAULT_QUERY_LIMIT = 30;

router.get("/races/current", async (req, res) => {
  const queryString = `SELECT *
                      FROM races
                      WHERE year = ${new Date().getFullYear()} 
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const currentSeasonRaces = await db.query(queryString, [queryLimit]).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      limit: queryLimit,
      total: currentSeasonRaces.length,
    },
    results: {
      races: currentSeasonRaces,
    },
  });
});

module.exports = router;
