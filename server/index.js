const jsonServer = require('json-server');
const auth = require('json-server-auth');
const delay = require('express-delay');
const path = require('path');

require('node-env-file')('.env');
const PRODUCTION = process.env?.PRODUCTION === 'true';
const PORT = 5000;

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, 'build'),
});

app.db = router.db;

if (PRODUCTION) {
  router.render = (req, res) => {
    res.jsonp(res.locals.data);
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  };
}
app.use(auth);
app.use(middlewares);
app.use(router);
app.use(delay(100, 500));
app.listen(PORT, () => {
  console.log(`server started on ${PORT} port`);
});
