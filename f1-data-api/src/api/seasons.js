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

  return res.json({
    info: {
      limit: queryLimit,
      total: seasons.length,
    },
    results: {
      seasons: seasons,
    },
  });
});

router.get("/seasons/current", async (req, res) => {
  const queryString = `SELECT *
                      FROM seasons
                      WHERE year = YEAR(CURDATE())`;

  const seasons = await db.query(queryString).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      total: seasons.length,
    },
    results: {
      seasons: seasons,
    },
  });
});

router.get("/seasons/last", async (req, res) => {
  const queryString = `SELECT *
                      FROM seasons
                      WHERE year = YEAR(CURDATE()) - 1`;

  const seasons = await db.query(queryString).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      total: seasons.length,
    },
    results: {
      seasons: seasons,
    },
  });
});

router.get("/circuits/:circuitName/seasons", async (req, res) => {
  const queryString = `SELECT DISTINCT s.*
                      FROM seasons s
                      JOIN races r ON r.year = s.year
                      JOIN circuits c ON c.circuitId = r.circuitId
                      WHERE c.circuitRef = ?
                      ORDER BY s.year
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const seasons = await db.query(queryString, [req.params.circuitName, queryLimit]).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      limit: queryLimit,
      total: seasons.length,
    },
    results: {
      circuitName: req.params.circuitName,
      seasons: seasons,
    },
  });
});

router.get("/constructors/:constructorName/seasons", async (req, res) => {
  const queryString = `SELECT DISTINCT s.*
                      FROM seasons s
                      JOIN races r ON r.year = s.year
                      JOIN circuits c ON c.circuitId = r.circuitId
                      JOIN constructorResults cr ON cr.raceId = r.raceId
                      JOIN constructors ct ON ct.constructorId = cr.constructorId
                      WHERE ct.constructorRef = ?
                      ORDER BY s.year
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const seasons = await db.query(queryString, [req.params.constructorName, queryLimit]).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      limit: queryLimit,
      total: seasons.length,
    },
    results: {
      constructorName: req.params.constructorName,
      seasons: seasons,
    },
  });
});

router.get("/drivers/:driverId/seasons", async (req, res) => {
  const queryString = `SELECT DISTINCT s.*
                      FROM seasons s
                      JOIN races r ON r.year = s.year
                      JOIN results rs ON rs.raceId = r.raceId
                      JOIN drivers d ON d.driverId = rs.driverId
                      WHERE d.driverRef = ?
                      ORDER BY s.year
                      LIMIT ?`;

  const queryLimit = req.query.limit !== undefined ? parseInt(req.query.limit) : DEFAULT_QUERY_LIMIT;

  const seasons = await db.query(queryString, [req.params.driverId, queryLimit]).catch((err) => {
    throw err;
  });

  return res.json({
    info: {
      limit: queryLimit,
      total: seasons.length,
    },
    results: {
      driverId: req.params.driverId,
      seasons: seasons,
    },
  });
});

module.exports = router;
