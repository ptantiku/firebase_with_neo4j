const functions = require('firebase-functions');
const express = require('./node_modules/express');
const app = express();
app.use(require('cors')({ origin: true }));

// const database = require('./firebase-database');

// Learn to write functions at
// https://firebase.google.com/docs/functions/write-firebase-functions

const router = express.Router();

// normal routes
router.get('/', (req, res) => res.send('Home'));
router.get('/test', (req, res) => { res.send('HelloWorld'); });
router.get('/api', (req, res) => res.send('Home API'));

//--------neo4j-------
router.get('/users', async (req, res) => {
  const uri = functions.config().neo4j.uri; // bolt://....:7687
  const username = functions.config().neo4j.username || 'neo4j';
  const password = functions.config().neo4j.password || '';
  const neo4j = require('neo4j-driver').v1;
  const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), { disableLosslessIntegers: true });

  try {
    const session = driver.session();
    const result = await session.run('MATCH (u:USER) RETURN u')
    session.close();
  
    const users = [];
    for(const record of result.records) {
      const node = record.get(0);
      users.push(node);
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ data: users });
  } catch (err) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ err: err.msg });
  } finally {
    // on application exit:
    driver.close();
  }
});

// export the router under /api prefix
app.use('/api', router);
exports.api = functions.https.onRequest(app);
