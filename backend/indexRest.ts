import express from "express";
import Projectroutes from "./resources/product/products.routes"
import restConnection from "./connectRest";


const app = express();
app.use(express.json());
app.use(Projectroutes);
restConnection();

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
