import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import destinations from "./destinations.json" with { type: 'json' };

let locations = destinations

dotenv.config();

const port = 3000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));
app.use(express.json());

let CurrentLocation = "";
let DeleteLocation = "";

app.post('/InputLocation', (req, res) => {
  CurrentLocation = req.body.CurrentLocation;

  res.status(200).json({
      message: "POST Request Called successfully",
      locationReceived: CurrentLocation
  });
});

app.post('/SetDeleteLocation', async (req, res) => {
  DeleteLocation = req.body.RemoveLocation;

  res.status(200).json({
      message: "POST Request Called successfully",
      locationToRemove: DeleteLocation
  });

  await fetch("/DeleteCountry"); // having problem here

});

app.put('/UpdateLocation', (req, res) => {
  CurrentLocation = req.body.CurrentLocation;

  res.status(200).json({
      message: "PUT Request Called successfully",
      locationReceived: CurrentLocation
  });
});


app.get("/Destinations", (request, response) => {
  response.json(locations);


});

app.delete('/DeleteCountry', (request, response)=>{
  locations = locations.filter(location => location.country !== DeleteLocation)  

    response.status(200).json({
      message: "DELETE Request Called successfully",
      AvailableLocations: locations
  });
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
