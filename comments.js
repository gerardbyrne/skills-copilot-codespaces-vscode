// Create web server
// Usage: node comments.js
// Access: http://localhost:3000
// Use: curl -X POST http://localhost:3000/comments -d '{"comment":"Hello World!"}'

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')).toString());
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')).toString());
  comments.push(req.body);
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2));
  res.json({ message: 'Comment added' });
});

app.listen(3000, () => {
  console.log('Server started: http://localhost:3000');
});