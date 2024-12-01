const express = require('express');
const bodyParser = require('body-parser');

const data = require('./data');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.post('/addDevice', (req,res) => {
  const {device_name,device_type,brand,model,price,color,storage,battery,screen_size,camera,processor,release_date} = req.body;
  const newDevice = {
    id: data.length+1,
    device_name: device_name,
    device_type: device_type,
    brand: brand,
    model: model,
    price: price,
    color: color,
    storage: storage,
    battery: battery,
    screen_size: screen_size,
    camera: camera,
    processor: processor,
    release_date: release_date
  }
  data.push(newDevice);
  res.status(201).json(newDevice)
});

app.get('/getDevice', (req, res) => {
  res.json(data)
});

app.get('/getDevice/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const device = data.find((item) => item.id === id);
  if (device) {
    res.json(device)
  } else {
    res.status(404).json(`Device not found`)
  }
});

app.put('/updateDevice/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const device = data.find((item) => item.id === id);

  Object.assign(device, req.body);
  res.status(200).json(device);
});

app.patch('/updateDevice/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const device = data.find((item) => item.id === id);

  Object.assign(device, req.body);
  res.status(200).json(device);
});


app.delete('/deleteDevice/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const deletedDevice = data.findIndex((item) => item.id === id);

    data.splice(deletedDevice, 1);
  
    res.status(200).json(`Device deleted`)
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});