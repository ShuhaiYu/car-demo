const express = require('express');
const router = express.Router();
const db = require('../db'); 
const authMiddleware = require('../middleware/authMiddleware'); 

// protected route
router.get('/', (req, res) => {
  let sql = 'SELECT id, maker, model, year, description';
  const filters = [];
  const params = [];

  // validate user authentication
  const isAuthenticated = req.headers['authorization'] ? true : false;

  if (isAuthenticated) {
    sql += ', price'; // add price column to the query
  }

  sql += ' FROM cars';

  if (req.query.maker) {
    filters.push('maker = ?');
    params.push(req.query.maker);
  }
  if (req.query.model) {
    filters.push('model = ?');
    params.push(req.query.model);
  }
  if (req.query.startYear) {
    filters.push('year >= ?');
    params.push(req.query.startYear);
  }
  if (req.query.endYear) {
    filters.push('year <= ?');
    params.push(req.query.endYear);
  }
  
  if (filters.length > 0) {
    sql += ' WHERE ' + filters.join(' AND ');
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Search Error:', err);
      return res.status(500).json({ error: 'Database Query Error' });
    }
    res.json(results);
  });
});

router.get('/makers', (req, res) => {
  db.query('SELECT DISTINCT maker FROM cars', (err, results) => {
    if (err) {
      console.error('Maker Error:', err);
      return res.status(500).json({ error: 'Database Query Error' });
    }
    res.json(results.map((row) => row.maker));
  });
});

router.get('/models', (req, res) => {
  if (!req.query.maker) {
    return res.status(400).json({ error: 'Maker is required' });
  }

  db.query('SELECT DISTINCT model FROM cars WHERE maker = ?', [req.query.maker], (err, results) => {
    if (err) {
      console.error('Model Error:', err);
      return res.status(500).json({ error: 'Database Query Error' });
    }
    res.json(results.map((row) => row.model));
  });
});


module.exports = router;
