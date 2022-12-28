import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path;
        this.isSaved = false;
        this.isUpdated = false;
        this.isDeleted = false;
        try {
            this.carts = fs.readFileSync(this.path, null, "utf8");
            this.carts = JSON.parse(this.carts);
        }
        catch (error) {
            this.carts = [];
        }
    }

    async addcart(cart) {
    
        console.log(cart);
        const hasPropierties = Object.values(cart).every(x => x);
        
        if (hasPropierties) {
            try {
                this.carts.push(cart);
                this.isSaved = true;
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
                console.log('Elemento Guardado')
                
            } catch (error) {
                console.log('Error Guardando Elemento:', error)
                this.isSaved = false
            }
        }
        else
            console.log("Falta Ingresar alguna propiedad");

    }

    async update(id, product) {
        try {
            
            const cart = this.carts.find((c) => c.id == id)
 
            const index = this.carts.findIndex((c) => c.id == id)
            if (index !== -1) {
                console.log(this.carts.products)
                const isAlreadyInCart = cart.products.find((p) => p.id == product.id)
               
                if(isAlreadyInCart)
                {
                    const indexProduct = cart.products.findIndex((p) => p.id == product.id)
                    this.carts[index].products[indexProduct].quantity++;
                }
                else
                {
                    cart.products.push(product);
                    
                }
                this.carts[index] = cart;
                
                this.isUpdated = true;
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, '\t'))
                
            }
        } catch (error) {
            this.isUpdated = false;
            console.log('Error al actulizar carto:', error)
        }
    }

    getCartProductsById(id) {
        let cart = this.carts.find(cart => cart.id == id);

        if (cart)
            return cart.products;
        else
            console.log("Not Found");

    }

}


export default new CartManager("./carts.json");
