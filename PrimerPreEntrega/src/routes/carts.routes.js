import { Router } from "express";
import CartManager from "../managers/CartManager.js";



const router = new Router();
const carts = CartManager.carts;


router.post("/", (req, res) =>{

    const {products} = req.body;

    const cart = {
        id: carts[0] ? carts[carts.length -1 ]["id"] + 1 : 1,
        products
    }

   

    CartManager.addcart(cart)

    if(CartManager.isSaved)
    {
        res.status(201).json({ info: "Created", cart });
    }
    else
        res.status(500).json({info: "Internal Error"});
});

router.post("/:cid/product/:pid", (req, res) =>{

    
    const { cid, pid } = req.params;
   

     const product = {
        id: pid,
        quantity: 1
     }
   
  
    CartManager.update(cid, product)

    if(CartManager.isUpdated)
    {
        res.status(200).json({ info: "Ok", product });
    }
    else
        res.status(500).json({info: "Internal Error"});
});



  
router.get('/:id', async (req, res) =>{
    const { id } = req.params

    const products = CartManager.getCartProductsById(id);

    if(!products)
        return res.status(404).send("Not found");

    return res.status(200).json(products);
  });


export default router