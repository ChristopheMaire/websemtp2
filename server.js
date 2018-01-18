var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var user = require('./models/user.js');
var userController = require('./controller/user.js');
var session = require('express-session');
var cookie = require('cookie-parser');
var produit = require('./models/produit.js');
var produitController = require('./controller/produit.js');

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');


/* ----------------------------------------------------- */


// Redirection vers page login si url = http://localhost:1313/
app.get('/', function (req, res) {
    res.redirect('/login');
});

// Redirection vers page login
app.get('/login', function (req, res) {
    console.log(req.query);
    res.render('login');
});

// Redirection page inscription
app.get('/inscription', function (req, res) {
    res.render('inscription')
});

// Redirection page profil
app.get('/profil', function (req, res) {
    if (req.session === undefined) {
        res.redirect('/login');
    }
    else {
        res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
    }
});

// Redirection page produits
app.get('/produits', produitController.recupProduit);

/* -------------------------------------------------- */

// Route -> connexion
app.post('/login', userController.connexion);

// Route -> inscription à la bdd
app.post('/inscription', userController.inscription);

// Route -> suppression du compte utilisateur à la bdd
app.post('/deleteAccount', userController.deleteAccount);

// Route -> suppression du compte par Admin
app.post('/deleteAccountAdmin', userController.deleteAccountAdmin);

// Route -> déconnexion
app.post('/logoutAccount', userController.logoutAccount);

// Route -> modif info utilisateur
app.post('/modifUtil', userController.modifierUtilisateur);


/* -------------------------------------------------- */


// Route -> Ajout produit
app.post('/addItem', produitController.ajoutProduit);

// Route -> Supprimer produit
app.post('/deleteItem', produitController.suppProduit);

// Route -> Affichage produit
app.post('/produits', produitController.recupProduit);


app.listen(1313);



