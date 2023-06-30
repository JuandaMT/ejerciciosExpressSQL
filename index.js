const express = require("express");
const mysql = require("mysql2");
const app = express();

//middlware
app.use(express.json()); //para que el body no sea undefined

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "expressDB",
});
db.connect();


/* CREAR BASE DE DATOS */
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE expressDB";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});
/* TABLA DE PRODUCTOS CREADA */
app.get("/products", (req, res) => {
  let sql =
    "CREATE TABLE products(id int AUTO_INCREMENT, name_product VARCHAR(50), price INT, PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Products table created...");
  });
});

/* TABLA DE CATEGORIAS CREADA */
app.get("/categories", (req, res) => {
  let sql =
    "CREATE TABLE categories(id int AUTO_INCREMENT, name_category VARCHAR(50), description VARCHAR(50), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Categories table created...");
  });
});

/* TABLA DE CATEGORIAS_PRODUCTOS CREADA */
app.get("/categoriesProducts", (req, res) => {
  let sql =
    "CREATE TABLE categoriesProducts(id int AUTO_INCREMENT, product_id INT, category_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES expressDB.products(id), FOREIGN KEY(category_id) REFERENCES expressDB.categories(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Intermediate table categories products created...");
  });
});
/* EJERCICIO 2 */
// Post para crear producto
app.post("/createProduct", (req, res) => {
  let sql = `INSERT INTO products (name_product, price) values ('${req.body.name_product}', '${req.body.price}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added...");
  });
});
// Post para crear categoria
app.post("/createCategory", (req, res) => {
  let sql = `INSERT INTO categories (name_category, description) values ('${req.body.name_category}', '${req.body.description}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added...");
  });
});

/* EJERCICIO 3 */
// Actualizar producto
app.put("/updateProduct/:id", (req, res) => {
  let name_product = req.body.name_product;
  let price = req.body.price;
  let sql = `UPDATE products SET "name_product" = '${name_product}', "price" = '${price}' WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Product updated...");
  });
});
// Actualizar categoria
app.put("/updateCategory/:id", (req, res) => {
    let name_category = req.body.name_category;
    let description = req.body.description;
    let sql = `UPDATE products SET "name_category" = '${name_category}', "description" = '${description}' WHERE id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Product updated...");
    });
  });


/* EJERCICIO 5 */
app.delete("/deleteProduct/:id",(req, res) => {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Product deleted");
    });
  });

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
