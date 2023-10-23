const express = require("express");
const app = express();

const router = express.Router();
// module.exports = router;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config({ path: './config/.env' });

const cors = require('cors');
app.use(cors());

require('dotenv').config();

// routes
const usersRoutes = require('./controller/usersCtrl');
const postsRoutes = require('./controller/postsCtrl');
const commentsRoutes = require('./controller/commentsCtrl');

app.use('/user', usersRoutes);
app.use('/post', postsRoutes);
app.use('/comment', commentsRoutes);

const port = process.env.port;
app.listen(port, () => {
    console.log(`Notre application est démarrrée sur : http://localhost:${port}`);
});