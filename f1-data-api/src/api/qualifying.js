const express = require("express");
const router = express.Router();
const db = require("../database/mysql");
const DEFAULT_QUERY_LIMIT = 30;

router.get("/:year/:round/qualifying", async (req, res) => {
  const raceInformationQuery = `SELECT year, round, url, name, date, time, raceId
                                FROM races
                                WHERE year = ? AND round = ?`;

  const circuitInformationQuery = `SELECT c.*
                                FROM races r
                                JOIN circuits c ON c.circuitId = r.circuitId
                                WHERE year = ? AND round = ?`;

  const qualifyingResultsQuery = `SELECT d.driverId, d.number, d.forename AS firstName,
                                         d.surname AS lastName, d.code, d.nationality,
                                         q.position, ct.constructorId, ct.name, q.q1, q.q2, q.q3
                                FROM qualifying q
                                JOIN races r ON r.raceId = q.raceId
                                JOIN drivers d ON d.driverId = q.driverId
                                JOIN constructors ct ON ct.constructorId = q.constructorId
                                WHERE r.year = ? AND r.round = ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const raceInformation = await db.query(raceInformationQuery, [req.params.year, req.params.round]).catch((err) => {
    throw err;
  });

  const circuitInformation = await db
    .query(circuitInformationQuery, [req.params.year, req.params.round])
    .catch((err) => {
      throw err;
    });

  const qualifyingResults = await db.query(qualifyingResultsQuery, [req.params.year, req.params.round]).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      limit: queryLimit,
      total: qualifyingResults.length,
    },
    results: {
      race: raceInformation,
      circuit: circuitInformation,
      qualifying: qualifyingResults,
    },
  });
});

module.exports = router;
