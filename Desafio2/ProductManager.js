const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        try {
            this.products = fs.readFileSync(this.path, null, "utf8");
            this.products = JSON.parse(this.products);
        }
        catch (error) {
            this.products = [];
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        let requieried = {
            title: null,
            description: null,
            price: null,
            thumbnail: null,
            code: null,
            stock: null
        }


        let product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        const hasPropierties = Object.values(product).every(x => x);




        if (this.products.find(x => x.code == code))
            console.log("ese producto ya esta incluido");
        else if (hasPropierties) {
            this.products.push(product);
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
                console.log('Elemento Guardado')
            } catch (error) {
                console.log('Error Guardando Elemento:', error)
            }
        }
        else
            console.log("Falta Ingresar alguna propiedad");

    }

    async update(id, product) {
        try {
            const oldProduct = this.products.find((product) => product.id === id)
            const index = this.products.findIndex((product) => product.id === id)
            if (index !== -1) {
                const newProduct = { ...oldProduct, ...product }
                this.products[index] = newProduct
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            }
        } catch (error) {
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
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'));
            }
        }
        catch (error) {
            console.log("Error al borrar", error);
        }
    }
}

let pm = new ProductManager("./productos.json");

//pm.addProduct("fanta", "gaseosa", 1500, "imagen.png", "4", 20);
pm.addProduct("coca", "gaseosa", 1000, "imagen.jpg", "2", 100);

//console.log(pm.getProducts());
console.log(pm.getProductById(1));

//pm.update(1, { title: "coca" });

pm.deleteProduct(2);

console.log(pm.getProducts());

//al borrar y crear nuevo producto se repite el id , no lo pide la consigna 
//asi que no se soluciona, 
//posible solucion: guardar la longitud del array en el arhcivo y de ahi generar el id 
