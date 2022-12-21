import express from 'express';
import userManager from './ProductManager.js'

const app = express();

app.get('/products', async (req, res) => {
    const { limit } = req.query
    let products = userManager.getProducts();
    
    if(limit)
        products = products.slice(0, limit);
    
   
    res.json(products)
  });

  app.get('/products/:id', async (req, res) =>{
    const { id } = req.params

    const product = userManager.getProductById(id);

    if(!product)
        return res.send("Not found");

    return res.json(product);

  });



  app.listen(3000, () => console.log("listening on port 3000"));