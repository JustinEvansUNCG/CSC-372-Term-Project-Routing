How to run:
To run, make sure you are in the same folder as server.js in your terminal, and then use the following command in gitbash

Use the initializedb route in thunder client to initialize the db

node server.js

From here you can see all routes on cartRoutes.js and productRoutes.js to see all routes and how to query each route in thunderclient

Note that if I remove the node modules folder the code will not run. It infortunately must stay in this repo.
you also have to manually go to the admin pages at: http://localhost:3000/admin-products.html



If for some reason some package isn't installed by default, you would first need to run some of the following commands:




npm install multer




nmp install express




npm install sqlite



npm install sqlite3




npm install better-sqlite3
