const express = require('express');
const port = 8080;
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
require('dotenv').config();

//////READ REQUEST BODY (5)
app.use(bodyParser.json());

/////CONNECT THIS BACKEND TO FRONTEND (3)
app.use(cors());

/////SEE THE RESPONSE AT WEBSITE (2)
app.get("/", (request, response) => {
  response.send('Hello!')
});

/////GET ROUTER (4)
const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter);

const cartItemsRouter = require('./routes/cartItems');
app.use('/cartItems', cartItemsRouter);

/////SEE AT CONSOLE THE RUN UPDATE (1)
app.listen(process.env.PORT || port, () => {
  console.log(`Express server running at port ${port}.`);
});