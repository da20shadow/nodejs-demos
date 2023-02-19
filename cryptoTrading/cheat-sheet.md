## Cheat Sheet

1. Initialize Project npm init -yes
2. Install nodemon - npm i nodemon -D
3. Add start script for index.js "scripts": {"start": "index.js"}
4. Install and setup express npm i express
   1. Add body parser app.use(express.urlencoded({extended: false})); 
   2. Create Routes routes.js
   3. Add static route
5. Install express handlebars npm i express-handlebars and setup view engine
   1. Add views folder
   2. add main layout header and nav also footer and {{body}}
6. Create HomeController or StaticPagesController and add it to routes
7. Configure database npm i mongoose
   1. Set strictQuery = false
8. Authentication
   1. Add Login & Register pages
   2. Create AuthController
9. Change the nav links
10. Install jsonwebtoken npm i jsonwebtoken