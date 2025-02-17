const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');  // Ensure data is saved in a file

// Read data from the file
const readData = () => {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile);
    return JSON.parse(rawData);
  }
  return { names: [], pickedNames: [] };  // Default structure if no data file
};

// Write data to the file
const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Endpoint to fetch current data
app.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// Endpoint to update names and picked names
app.post('/update', (req, res) => {
  const { names, pickedNames } = req.body;
  writeData({ names, pickedNames });
  res.status(200).send('Data updated');
});

// Endpoint to reset the data
app.post('/reset', (req, res) => {
  const data = readData();

  // Reset: move pickedNames back to names and clear pickedNames
  const newData = {
    names: [...data.names, ...data.pickedNames],  // Adding pickedNames back to names
    pickedNames: []  // Clear pickedNames
  };

  writeData(newData);  // Save the reset data
  res.status(200).send('Data reset');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
