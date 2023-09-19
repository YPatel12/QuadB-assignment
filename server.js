const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000;

// Create a database connection
const db = new sqlite3.Database('database.sqlite');
db.run(`
  CREATE TABLE IF NOT EXISTS wazirx_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    last REAL,
    buy REAL,
    sell REAL,
    volume REAL,
    base_unit TEXT
  )
`);

async function initialize()
{
    try {
      await fetchDataAndStore();
    //   res.status(200).send('Data fetched and stored successfully.');
    } catch (error) {
      console.error('Error fetching and storing data:', error);
    //   res.status(500).send('Internal Server Error');
    }
}


function isTableEmpty(tableName, callback) {
    const query = `SELECT COUNT(*) as count FROM ${tableName}`;
    db.get(query, (err, row) => {
      if (err) {
        console.error(`Error checking if ${tableName} is empty:`, err);
        callback(err, null);
      } else {
        const isEmpty = row.count === 0;
        callback(null, isEmpty);
      }
    });
  }

const fetchDataAndStore = async () => {

    isTableEmpty('wazirx_data', (err, isEmpty) => {
        if (err) {
          console.error('Error:', err);
        } else {
          if (isEmpty) {
            return;
          }
        }
      });
    
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;

    for (const ticker in tickers) {
      const { name, last, buy, sell, volume, base_unit } = tickers[ticker];
      db.run(
        'INSERT INTO wazirx_data (name, last, buy, sell, volume, base_unit) VALUES (?, ?, ?, ?, ?, ?)',
        [name, last, buy, sell, volume, base_unit]
      );
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
};
setTimeout(initialize,1000);
// Set up a route to fetch and store data
// app.get('/fetch-data', async (req, res) => {
//   try {
//     await fetchDataAndStore();
//     res.status(200).send('Data fetched and stored successfully.');
//   } catch (error) {
//     console.error('Error fetching and storing data:', error);
//     res.status(500).send('Internal Server Error');
//   }
//     });




app.get('/get-data', (req, res) => {
    db.all('SELECT * FROM wazirx_data', (err, rows) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(rows);
      }
    });
  });
  

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
