class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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
            
            
        

        if(this.products.find(x => x.code == code))
            console.log("ese producto ya esta incluido");
        else if(hasPropierties)
            this.products.push(product);
        else
            console.log("Falta Ingresar alguna propiedad");

    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let product = this.products.find(product => product.id == id);
        
        if(product)
            return product;
        else
            console.log("Not Found");

    }
}

let pm = new ProductManager();

pm.addProduct("coca", "gaseosa", 1000, "imagen.jpg", "2", 100);
pm.addProduct("coca", "gaseosa", 1000, "imagen.jpg", "2", 100);

console.log(pm.getProducts());
console.log(pm.getProductById(1));
