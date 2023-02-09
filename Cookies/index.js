const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');
const {use} = require("express/lib/router");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} //HTTPS?
}));

//JWT Secret key
const secretKey = "myVerySecretKey";


app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page!</h1>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/logout">Logout</a>
    `);
});

app.get('/register', (req, res) => {
    res.send(`
        <form method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <input type="password" name="rePassword" placeholder="Re-password">
        <button type="submit">Register</button>
</form>
    `);
});

app.post('/register', async (req, res) => {
    const {username, password, rePassword} = req.body;
    if (username && password && rePassword && password === rePassword) {
        const salt = await bCrypt.genSalt(9);
        const hash = await bCrypt.hash(password, salt);
        const authDate = {
            username,
            password: hash
        };
        console.log(authDate);
        //TODO: save user in DB
        return res.redirect('/login');
    }
    res.status(401).end();
});

app.get('/login', (req, res) => {
    res.send(`
        <form method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Login</button>
</form>
    `)
});

app.post('/login',  async(req, res) => {
    const {username, password} = req.body;

    // const user = db.users.find(x => x.username === username);
    // if (!user){
    //     throw 'Bad Credentials!';
    // }
    // const isAuthenticated = await bCrypt.compare(password, user.password);
    // if (!isAuthenticated){
    //     throw 'Bad Credentials!';
    // }
    //if authenticated set cookie and return user

    if (username === 'vipearn' && password === 'asdasd') {
        //JWT Token
        const payload = {username};
        const options = {expiresIn: '1h'};
        const token = jwt.sign(payload, secretKey, options);
        res.cookie('token', token,{httpOnly: true}); //httpOnly will make it impossible to access with js
        //One demo way
        // const authDate = {
        //     username: 'vipearn'
        // };
        // res.cookie('user', JSON.stringify(authDate));
        // res.session.privateInfo = 'Some private info!';
        return res.redirect('/profile');
    }
    res.status(401).end();
});

app.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('login');
});

app.get('/profile', (req, res) => {
    let token = req.cookies['token'];
    if (!token) {
        return res.status(401).send(`<h1>Invalid Token!</h1>`).end();
    }

    try {
        const decodedToken = jwt.verify(token,secretKey)

        return res.send(`
            <div>
            <h1>Hi , Welcome! ${decodedToken.username}</h1>
    </div>
        `);

    }catch (err){
        console.log(err)
        return res.status(401).send(`<h1>Invalid Token!</h1>`).end();
    }
});

// app.get('/profile', (req, res) => {
//     let user = req.cookies['user'];
//     if (!user) {
//         return res.status(401).end();
//     }
//     user = JSON.parse(user);
//     res.send(`
//         <div>
//         <h1>Hi , Welcome! ${user.username}</h1>
// </div>
//     `)
// });

app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})