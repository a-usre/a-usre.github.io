const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./posts/db1.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.post('/updateJson', (req, res) => {
  const newData = req.body;
  const data = JSON.parse(fs.readFileSync('./posts/db1.json', 'utf8'));
  Object.assign(data, newData);
  fs.writeFileSync('./posts/db1.json', JSON.stringify(data));
  res.status(200).send('JSON file updated successfully');
});
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});