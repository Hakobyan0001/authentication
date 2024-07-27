import { createServer } from 'http';

import app from './app';
import { port } from './config';
const server = createServer(app);

server.listen(port, function () {
  console.log('Server is listening on port', port);
});
