const express = require("express");
const router = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { User } = require("../models");
const saltRounds = 10;

const validator = require("validator");
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,}$/; 

router.use(cors());
//register
router.post("/register", async (req, res) => {
  const { nom, prenom, email, password } = req.body;
  console.log(req.body);

  try {
    if (nom == "" || prenom == "" || email == "" || password == "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    }
    if (!regexPassword.test(password)) {
      return res.status(400).json({ message: "invalid password" });
    } /* si le champs "password" ne respecte pas le regex alors on informe le client */
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "invalid email" });
    } /* si le champs "email" ne respecte pas le validator alors on informe le client */
    const user = await User.findOne({ where: { email: email } });
    /* findone: requête sql qui revient à dire: SELECT email FROM users 
          elle recherche un utilisateur dans la base de données avec l'email spécifié.*/
    if (user === null) {
      /* cette instruction vérifie s'il n'a pas été trouvé d'utilisateur avec
          l'email donné dans la bdd. */
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        /* hacher le password avec un certain nbr de
              saltRounds. */
        const newUser = await User.create({
          /* après avoir haché le mdp, on utilise await pour créer
                  un nouveau user dans la bdd à l'aide de la méthode User.create. */
          nom: nom,
          prenom: prenom,
          password: hash,
          email: email,
          is_admin: 0,
        });
        if (newUser) {
          return res.status(200).json({ message: "User crée." });
        } else {
          return res.status(400).json({ message: "erreur serveur." });
        }
      });
    } else {
      return res
        .status(500)
        .json({ message: "cet email existe déjà, veuillez-vous connecter." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error registering user" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; 
    if (email == "" || password == "") {
      return res.status(500).json({ message: "Veuillez remplir tous les champs." });
    } 
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        token = jwt.sign({
            id: user.id,
            email: user.email,
            prenom: user.prenom,
            nom: user.nom,
            is_admin: user.is_admin,
          }, process.env.secret
        );
        return res.status(200).json({ token: token, redirect: '/' }); 
      } else {
        return res.status(400).json({ error: "Password Incorrect" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User does not exist" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; /* on récupère l'id */
    const { nom, prenom, email } =
      req.body; /* on récupère les données des champs */

    if (nom == "" || prenom == "" || email == "") {
      return res
        .status(500)
        .json({ message: "Veuillez remplir tous les champs." });
    } /* si l'un des champs est vide alors on lui demande le faire */

    const user = await User.findOne({ where: { id } });
    /* on utilise await pour effectuer une recherche dans la bdd à l'aide de la méthode findOne.
        elle recherche le user dans la base de données en utilisant l'identifiant fourni. */
    await user
      .update({
        nom: nom ? nom : user.nom,
        prenom: prenom ? prenom : user.prenom,
        email: email ? email : user.email,
        /* utilise "update" sur l'objet user pour mettre à jour les infos du user dans la bdd. les nouvelles données
            sont extraites de l'objet req.body. si l'une des propriétés (nom, prenom, email) est différente dans req.body,
            elle est mise à jour. sinon, les données de l'utilisateur seront conservées. */
      })
      .then(() => {
        return res.status(200).json({ message: "modification effectué" });
      });
  } catch (error) {
    return res.status(400).json({ message: "erreur lors de la modification" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; /* on récupère l'id */

    const user = await User.findOne({ where: { id: id } });
    /* on utilise await pour effectuer une recherche dans la bdd à l'aide de la méthode findOne.
        elle recherche l'id dans la base de données en utilisant l'identifiant fourni. */
    if (user) {
      /* cette condition vérifie si le user correspondant à l'identifiant a été trouvé dans la bdd. */
      await User.destroy({
        where: {
          id: id,
        } /* utilise la méthode destroy sur le users pour supprimer l'utilisateur de la bdd.
                la condition { where: { id: id } } spécifie quel user doit être supprimé en utilisant l'identifiant. */,
      }).then(() => {
        return res.status(200).json({ message: "utilisateur supprimé" });
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "erreur lors de la suppression" });
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); //findAll = SELECT * FROM User
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bah ça marche pas" });
  }
});

//get one user
router.get("/:id", async (req, res) => {
  const usersId = req.params.id;

  try {
    const user = await User.findByPk(usersId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Utilisateur pas trouver" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Bah ça marche pas" });
  }
});





module.exports = router;
