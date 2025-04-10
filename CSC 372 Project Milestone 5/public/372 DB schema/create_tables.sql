
  
  CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  last_modified VARCHAR(40) NOT NULL,
  name VARCHAR(40) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(40) NOT NULL,
  user_type INTEGER NOT NULL
  );

  
  CREATE TABLE Categories(
  type_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(40) UNIQUE NOT NULL
  );
  
  
  CREATE TABLE Products(
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(40) NOT NULL,
  description VARCHAR(200),
  image_url VARCHAR(150),
  price FLOAT NOT NULL,
  product_type INTEGER NOT NULL,
  FOREIGN KEY(product_type) REFERENCES Categories(type_id)
  );
  
  CREATE TABLE Carts (
  cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
  status INTEGER NOT NULL,
  date_created VARCHAR(40) NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(id)
  );
  
  CREATE TABLE CartProducts(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(cart_id) REFERENCES Carts(cart_id),
  FOREIGN KEY(product_id) REFERENCES Products(product_id)
  );
