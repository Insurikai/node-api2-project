require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 8000;

const postsRoute = require('./posts/postsRoute');
const commentsRoute = require('./posts/comments/commentsRoute');

server.use(express.json());
server.use('/api/posts', postsRoute);
server.use('/api/posts', commentsRoute);

server.listen(port, () => { console.log(`Listening on port ${port}.`); });
