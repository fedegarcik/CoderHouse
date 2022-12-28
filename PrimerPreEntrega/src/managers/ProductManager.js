import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.path = path;
        this.isSaved = false;
        this.isUpdated = false;
        this.isDeleted = false;
        try {
            this.products = fs.readFileSync(this.path, null, "utf8");
            this.products = JSON.parse(this.products);
        }
        catch (error) {
            this.products = [];

        }
    }

    async addProduct(product) {
   

        const hasPropierties = Object.values(product).every(x => x);
        if (this.products.find(x => x.code == product.code))
        {
            console.log("ese producto ya esta incluido");
            this.isSaved = false;
        }
        else if (hasPropierties) {
            try {
                this.products.push(product);
                this.isSaved = true;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t')) 
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
            
            const oldProduct = this.products.find((p) => p.id == id)
            console.log(oldProduct)
            const index = this.products.findIndex((p) => p.id == id)
            if (index !== -1) {
                const newProduct = { ...oldProduct, ...product }
                console.log(newProduct)
                this.products[index] = newProduct
                this.isUpdated = true;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
                
            }
        } catch (error) {
            this.isUpdated = false;
            console.log('Error al actulizar producto:', error)
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let product = this.products.find(product => product.id == id);

        if (product)
            return product;
        else
            console.log("Not Found");

    }

    async deleteProduct(id) {
        try {
            const index = this.products.findIndex(product => product.id == id);
            if (index !== -1) {
                this.products.splice(index, 1);
                this.isDeleted = true;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            }
        }
        catch (error) {
            console.log("Error al borrar", error);
            this.isDeleted = false;
        }
    }
}

let pm = new ProductManager("../files/productos.json");

//pm.addProduct("fanta", "gaseosa", 1500, "imagen.png", "4", 20);
//pm.addProduct("coca", "gaseosa", 1000, "imagen.jpg", "2", 100);


export default new ProductManager("./productos.json");
