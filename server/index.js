const jsonServer = require('json-server');
const auth = require('json-server-auth');

const app = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const delay = require('express-delay');

app.db = router.db;
app.use(delay(100, 500));
app.use(middlewares);
app.use(auth);
app.use(router);
app.listen(5000);
