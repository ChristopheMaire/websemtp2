var produit = require('../models/produit.js');
var logger = require('log4js').getLogger('Server');
var session = require('express-session');
var cookie = require('cookie-parser');


// Ajouter un produit : OK
module.exports.ajoutProduit = function (req, res) {
    console.log('Click');
    produit.findOne({
        where: {name: req.body.nom}
    }).then(function (produit) {
        console.log('Trouvé');
        logger.info(produit);
        res.render('profil_admin', {name: session.user.nom, privilege: session.user.privilege});
    }).catch(function (error) {
        produit.create({nom: req.body.nom, quantite: req.body.quantite, prix: req.body.prix}).then(function (produit) {
            logger.info(produit);
            console.log('Crée');
            res.render('profil_admin', {name: session.user.nom, privilege: session.user.privilege});

        })
    })
};

// Supprimer un produit : OK
module.exports.suppProduit = function (req, res) {
    console.log(req.body.nom_produit);
    produit.findOne({
        where: {nom: req.body.nom_produit}
    }).then(function (produit) {
        produit.destroy({where: {nom: req.body.nom_produit}});
        console.log('Trouvé et détruit');
        res.render('profil_admin', {name: session.user.nom, privilege: session.user.privilege});

    }).catch(function (error) {
        console.log('Plus de produit');
        res.render('profil_admin', {name: session.user.nom, privilege: session.user.privilege});

    })
};

// Recupération des produits : OK
module.exports.recupProduit = function (req, res) {
    produit.findAll().then(function (produit) {
        res.render('produits', {prod: produit, taille: produit.length});
    });
};