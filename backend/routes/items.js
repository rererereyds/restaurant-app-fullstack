const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/////GET JSON FILE (2)
const itemsFile = './items.json';
const itemsFilePath = path.resolve(__dirname, itemsFile);

/////PRINT JSON FILE ITEMS IN GET RESPONSE (3) 
router.get('/', (request, response) => {
  const itemsList = fs.readFileSync(itemsFilePath);
  response.send(itemsList);
});

/////HTTP VERBS FOR EACH/SINGLE ITEM (4)
router.get('/:id', (request, response) => {
  const itemsList = fs.readFileSync(itemsFilePath);
  const itemsListTransform = JSON.parse(itemsList);
  const item = itemsListTransform.find((item) => item.id == request.params.id);
  response.send(item);
});

router.post("/", (request, response) => {
  const itemsList = JSON.parse(fs.readFileSync(itemsFilePath));

  const newItem = {
    id: request.body.id,
    image: request.body.image,
    name: request.body.name,
    price: request.body.price,
    category: request.body.category,
    description: request.body.description,
  };

  itemsList.push(newItem);

  fs.writeFileSync(itemsFilePath, JSON.stringify(itemsList));

  response.status(201).send(itemsList);
});

router.put("/:id", (request, response) => {
  const itemsList = JSON.parse(fs.readFileSync(itemsFilePath));

  itemsList.forEach((item) => {
    if (item.id == request.params.id) {
      item.image = request.body.image;
      item.name = request.body.name;
      // item.price = request.body.price;
      item.category = request.body.category;
      item.description = request.body.description;
    }
  });

  fs.writeFileSync(itemsFilePath, JSON.stringify(itemsList));
  response.status(200).send(itemsList);
});

router.delete("/:id", (request, response) => {
  const itemsList = JSON.parse(fs.readFileSync(itemsFilePath));

  const filteredItems = itemsList.filter(
    (item) => item.id != request.params.id
  );

  fs.writeFileSync(itemsFilePath, JSON.stringify(filteredItems));
  response.status(202).send(filteredItems);
});


/////EXPORT ROUTER TO GIVE ACCES TO INDEX.JS (1)
module.exports = router;