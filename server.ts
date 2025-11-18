import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import destinations from "./destinations.json" with { type: 'json' };
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json" with { type: 'json' };

let locations = destinations

dotenv.config();

const port = 3000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

let CurrentLocation = "";
let DeleteLocation = "";

app.post('/InputLocation', (req, res) => {
  CurrentLocation = req.body.CurrentLocation;

  res.status(200).json({
      message: "POST Request Called successfully",
      locationReceived: CurrentLocation
  });
});

app.get('/GetCurrentLocation', (req, res) => {
  res.status(200).json({
    message: "GET Request Called successfully",
    locationReceived: CurrentLocation
  })
})

app.post('/SetDeleteLocation', async (req, res) => {
  DeleteLocation = req.body.RemoveLocation;

    res.status(200).json({
      message: "POST Request Called successfully",
      locationToRemove: DeleteLocation
  });

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

app.get("/VacationDestinations", (request, response) => {

  const VacationLength = locations.length - 1;
  const RandomIndex = Math.floor(Math.random() * (VacationLength + 1));
  const Vacation = locations[RandomIndex];

      response.status(200).json({
      message: "GET Request Called successfully",
      Vacation: Vacation
  });

});

app.delete('/DeleteCountry', (request, response) => {
  locations = locations.filter(location => location.name !== DeleteLocation)  

    response.status(200).json({
      message: "DELETE Request Called successfully",
      AvailableLocations: locations
  });
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
