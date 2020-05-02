const http = require('http');
const app = require('./FriendFundsBackend/app');
const port = process.env.PORT || 3005;
const server = http.createServer(app);
app.set('port',port);
server.listen(port);
