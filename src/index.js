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

app.get('/', (req, res) => {
  console.log('echoing');
  res
    .status(200)
    .send(
      `MOCK-FARADAY-BACKEND API😎 ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    );
});

app.get('/echo/:msg', (req, res) => {
  const msg = req.params.msg || 'echo';
  console.log(`echoing: ${msg}`);
  return res.status(200).json({ msg });
});

app.get('/mockdata/:length', (req, res) => {
  console.log('generating mock data: ' + req.params.length);
  const data = {
    x: [],
    y: []
  };

  const seed = 144;

  const dataAmount = req.params.length || 1e6;
  for (let i = 0; i < dataAmount; i++) {
    const change = Math.random() * 5 - 2.5; //a number between -0.025 and +0.025
    const y = (data.y[i - 1] || seed) + seed * change;
    data.y.push(y);
    data.x.push(i);
  }

  return res.status(200).json(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
