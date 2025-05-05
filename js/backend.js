const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');

const readData = () => {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile);
    return JSON.parse(rawData);
  }
  return { names: [], pickedNames: [] }; 
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

app.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/update', (req, res) => {
  const { names, pickedNames } = req.body;
  writeData({ names, pickedNames });
  res.status(200).send('Data updated');
});

app.post('/reset', (req, res) => {
  const data = readData();

  const newData = {
    names: [...data.names, ...data.pickedNames], 
    pickedNames: [] 
  };

  writeData(newData); 
  res.status(200).send('Data reset');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
