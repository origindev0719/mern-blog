const Product = require("../models/productModel");

export const product_index = (req, res) => {
  Product.find(function (err, products) {
    res.json(products);
  });
};

export const product_create = (req, res) => {
  let product = new Product(req.body);
  product
    .save()
    .then((product) => {
      Product.find(function (err, products) {
        res.json(products);
      });
    })
    .catch(function (err) {
      res.status(422).send("Product add failed");
    });
};

export const product_checkout = async (req, res) => {
  const carts = req.body.carts;
  await carts.forEach((cart) => {
    Product.findByIdAndUpdate(cart.id, {
      $inc: { quantity: -cart.count },
    }, function(err, product) {
      if (err){
        console.log(err)
      }
      else{
          console.log("Updated Product : ", product);
      }
    })
  });

  Product.find(function (err, products) {
    res.json(products);
  });
};
