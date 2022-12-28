import express from 'express';
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js"


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(3000, () => console.log("listening on port 3000"));