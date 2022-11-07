const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/////GET JSON FILE (2)
const cartItemsFile = './cartItems.json';
const cartItemsFilePath = path.resolve(__dirname, cartItemsFile);

/////PRINT JSON FILE ITEMS IN GET RESPONSE (3) 
router.get('/', (request, response) => {
  let cartItemsList = JSON.parse(fs.readFileSync(cartItemsFilePath));
  response.send(cartItemsList);
});


/////HTTP VERBS FOR EACH/SINGLE ITEM (4)
router.post('/', (request, response) => {
  let cartItemsList = JSON.parse(fs.readFileSync(cartItemsFilePath));
  let itemExist = false;

  cartItemsList = cartItemsList.map((item) => {
    if (request.body.id === item.id) {
      itemExist = true;
      item.quantity += 1;
    }
    return item;
  });

  if(!itemExist) {
    const newCartItemObject = {
      id: request.body.id, ///uuidv4() kay ms. kaye
      image: request.body.image,
      name: request.body.name,
      price: request.body.price,
      category: request.body.category,
      description: request.body.description,
      quantity: 1
    }
    cartItemsList.push(newCartItemObject);
  }

  fs.writeFileSync(cartItemsFilePath, JSON.stringify(cartItemsList), null, 2);
  response.status(201).send(cartItemsList);
});

router.delete('/:id', (request, response) => {
  let cartItemsList = JSON.parse(fs.readFileSync(cartItemsFilePath));

  const filteredCartItems = cartItemsList.filter(
    (item) => item.id != request.params.id
  );

  fs.writeFileSync(cartItemsFilePath, JSON.stringify(filteredCartItems), null, 2);
  response.status(202).send(filteredCartItems);
});

router.put('/:id', async (request, response) => {
  let cartItemsList = JSON.parse(fs.readFileSync(cartItemsFilePath));

  cartItemsList.forEach((item) => {
    if (item.id == request.params.id) {
      if (request.body.method === 'add') {
        item.quantity+=request.body.qty;
      }

      if (request.body.method === 'subtract') {
        item.quantity-=request.body.qty;
      }
    }
  });

  const filteredCartItems = await cartItemsList.filter(
    (item) => item.quantity !== 0
  );

  fs.writeFileSync(cartItemsFilePath, JSON.stringify(filteredCartItems), null, 2);
  response.status(202).send(filteredCartItems);
});

router.put("/:id/edit", (request, response) => {
  let cartItemsList = JSON.parse(fs.readFileSync(cartItemsFilePath));

  cartItemsList.forEach((item) => {
    if (item.id == request.params.id) {
      item.image = request.body.image;
      item.name = request.body.name;
      item.category = request.body.category;
    }
  });
  fs.writeFileSync(cartItemsFilePath, JSON.stringify(cartItemsList), null, 2);
  response.status(200).send(cartItemsList);
});

router.get('/getTotalAmount', async (request, response) => {
  let cartItemsList = JSON.parse(fs.readFileSync(cartItemsFilePath));
  
  let totalAmount = 0;

  await cartItemsList.filter((item) => {
    totalAmount+=(item.quantity*item.price);
  });

  response.status(202).send({total: totalAmount});
});

router.post('/checkout', async (request, response) => {
  const emptyCart = [];
  fs.writeFileSync(cartItemsFilePath, JSON.stringify(emptyCart), null, 2);
  response.status(200).send(emptyCart);
});

/////EXPORT ROUTER TO GIVE ACCES TO INDEX.JS (1)
module.exports = router;