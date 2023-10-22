const express = require("express");
const app = express();

const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

require('dotenv').config();

const port = process.env.port;

// routes
const usersRoutes = require('./controller/usersCtrl');
const postsRoutes = require('./controller/postsCtrl');
// const commentsRoutes = require('./controller/commentsCtrl');

app.use('/user', usersRoutes);
app.use('/post', postsRoutes);
// app.use('/comment', commentsRoutes);

app.listen(port, () => {
    console.log(`Serveur en ligne sur le port ${port}`)
});