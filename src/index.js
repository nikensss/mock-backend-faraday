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

app.get('/mockdata', (req, res) =>
  res.status(200).json({
    xAxis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    yAxis: [12, 11.34, 11.57, 12, 11.34, 11.57, 12, 11.34, 11.57, 11, 98]
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
