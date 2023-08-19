const express = require("express");
const router = express.Router();
const db = require("../database/mysql");
const DEFAULT_QUERY_LIMIT = 30;

router.get("/:year/:round/results", async (req, res) => {
  const raceInformationQuery = `SELECT year, round, url, name, date, time
                      FROM races
                      WHERE year = ? AND round = ?`;

  const circuitInformationQuery = `SELECT c.*
                      FROM races r
                      JOIN circuits c ON c.circuitId = r.circuitId
                      WHERE year = ? AND round = ?`;

  const raceResultQuery = `SELECT res.number, res.position, res.positionText, res.points,
                                  d.driverId, d.number, d.code, d.forename AS firstName, d.surname AS lastName,
                                  d.nationality, res.grid, res.laps, res.statusId, res.time, s.status
                      FROM results res
                      JOIN races r ON r.raceId = res.raceId
                      JOIN drivers d ON d.driverId = res.driverId
                      JOIN status s ON s.statusId = res.statusId
                      WHERE r.year = ? AND r.round = ?
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const raceInformation = await db
    .query(raceInformationQuery, [req.params.year, req.params.round, queryLimit])
    .catch((err) => {
      throw err;
    });

  const circuitInformation = await db
    .query(circuitInformationQuery, [req.params.year, req.params.round, queryLimit])
    .catch((err) => {
      throw err;
    });

  const raceResult = await db.query(raceResultQuery, [req.params.year, req.params.round, queryLimit]).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      limit: queryLimit,
      total: raceResult.length,
    },
    result: {
      race: raceInformation,
      circuit: circuitInformation,
      results: raceResult,
    },
  });
});

module.exports = router;
