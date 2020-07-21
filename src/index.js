import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(
  bodyParser.urlencoded({
    limit: '15mb',
    extended: true
  })
);

//use this middleware to allow all applications to query this api
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) =>
  res
    .status(200)
    .send(
      `MBMNN API😎 ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    )
);

app.get('/echo', (req, res) => res.status(200).json({ msg: 'echo' }));

app.get('/mockdata', (req, res) => {
  const data = {
    x: [],
    y: []
  };

  const dataAmount = 1e6;
  for (let i = 0; i < dataAmount; i++) {
    data.x.push(i);
    data.y.push(11 + Math.random() * 2);
  }

  return res.status(200).json(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
