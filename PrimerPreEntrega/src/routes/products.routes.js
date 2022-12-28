import { Router } from "express";
import userManager from '../managers/ProductManager.js'


const router = new Router();

const products = userManager.products;
router.get('/', async (req, res) => {
    const { limit } = req.query
    let products = userManager.getProducts();
    
    if(limit)
        products = products.slice(0, limit);
    
   
    res.status(200).json(products)
  });

  
  router.get('/:id', async (req, res) =>{
    const { id } = req.params

    const product = userManager.getProductById(id);

    if(!product)
        return res.status(404).send("Not found");

    return res.status(200).json(product);
  });


    router.post("/", (req, res) =>{

        const {title, description, price, thumbnail, code, stock} = req.body;

        const product = {
         id: products[0] ? products[products.length -1 ]["id"] + 1 :1,
         title, 
         description, 
         price, 
         thumbnail, 
         code, 
         stock
        }

       

        userManager.addProduct(product)
   
        if(userManager.isSaved)
        {
            res.status(201).json({ info: "Created", product });
        }
        else
            res.status(500).json({info: "Internal Error"});
    });

    
    router.put("/:id", (req, res) =>{

        const {title, description, price, thumbnail, code, stock} = req.body;


        const { id } = req.params;

        const product = {
         title, 
         description, 
         price, 
         thumbnail, 
         code, 
         stock
        }

        

        userManager.update(id, product)

        if(userManager.isUpdated)
        {
            res.status(200).json({ info: "Ok", product });
        }
        else
            res.status(500).json({info: "Internal Error"});
    });

    router.delete("/:id", (req, res) =>{



        const { id } = req.params;


        

        userManager.deleteProduct(id)

        if(userManager.isDeleted)
        {
            res.status(200).json({ info: "Ok"});
        }
        else
            res.status(500).json({info: "Internal Error"});
    });






  export default router