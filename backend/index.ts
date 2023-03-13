import express from 'express';
import http from 'http';
const PORT = 8080;

const app = express();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running for real on localhost:${PORT}/`);
});

export {};
