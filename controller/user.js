var user = require('../models/user.js');
var logger = require('log4js').getLogger('Server');
var session = require('express-session');
var cookie = require('cookie-parser');


/* -------- Methodes Communes --------- */

// Connexion admin/utilisateur : OK
module.exports.connexion = function (req, res) {
    user.findOne({where: {nom: req.body.username, mdp: req.body.password}}).then(function (user) {
        logger.info(user);
        session.user = {nom: user.dataValues.nom, privilege: user.dataValues.privilege, mdp: user.dataValues.password};

        if (user.dataValues.privilege === "admin") {
            res.render('profil_admin', {
                name: session.user.nom,
                privilege: session.user.privilege,
                mdp: session.user.mdp
            });

        }
        else {
            res.render('profil', {name: session.user.nom, privilege: session.user.privilege, mdp: session.user.mdp});

        }
    }).catch(function (error) {
        logger.error(user);
        res.render('login');
    })
};

// Inscription dans la base : OK
module.exports.inscription = function (req, res) {

    user.findOne({where: {nom: req.body.username, mdp: req.body.password}}).then(function (user) {
        //logger.info(user);
        if (user.dataValues.nom === '' || user.dataValues.password === '') {
            res.render('inscription');
        }
        else {
            session.user = {
                nom: user.dataValues.nom,
                privilege: user.dataValues.privilege,
                mdp: user.dataValues.password
            };
            res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
        }
    }).catch(function (error) {
        user.create({nom: req.body.username, mdp: req.body.password}).then(function (user) {
            //logger.info(user);
            session.user = {nom: user.dataValues.nom, privilege: user.dataValues.privilege};
            res.render('profil', {name: user.nom, privilege: user.privilege});
        })
    })
};

// Deconnexion : PAS OK
module.exports.logoutAccount = function (req, res) {
    logger.info(user);
    console.log('trotrtorltrotl ' + session.user.nom);


    if (req.session) {
        req.session = null;
        console.log('Deco');
        res.render('login');
    }
    else {
        res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
        console.log('pas déco');
    }
};


/* --------- Utilisateur simple -------- */


// Suppression de compte : OK
module.exports.deleteAccount = function (req, res) {

    user.findOne({where: {nom: session.user.nom}}).then(function (user) {
        logger.info(user);
        user.destroy({where: {nom: session.user.nom}});
        console.log('detruit');
        res.render('login');
    }).catch(function (error) {
        console.log('pas detruit');
        res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
    })
};

// Modification donnees Utilisateur : OK
module.exports.modifierUtilisateur = function (req, res) {
    user.findOne({where: {nom: session.user.nom}}).then(function (user) {
        logger.info(user);
        console.log(req.body.new_username + ' ' + req.body.new_password + ' ' + user.mdp + ' ' + user.nom);
        user.update({nom: req.body.new_username, mdp: req.body.new_password}, {
            where: {
                nom: user.nom,
                mdp: user.mdp
            }
        }).then(function (user) {
            logger.info(user);
            session.user = {nom: user.dataValues.nom, privilege: user.dataValues.privilege};
            res.render('profil', {name: user.nom, privilege: user.privilege});
        }).catch(function (error) {
            res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
        });
    })
};


/* --------- Utilisateur Admin -------- */

// Suppression de compte par admin : OK
module.exports.deleteAccountAdmin = function (req, res) {
    user.findOne({where: {nom: req.body.username}}).then(function (user) {
        logger.info(user);
        // Si nom est trouvé : Si l'utilisateur est admin alors on supprime le profil associer au nom entré
        if (session.user.privilege === 'admin') {
            user.destroy({where: {nom: req.body.username}});
            console.log('detruit');
            res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
        }
        else {
            console.log('pas detruit');
            res.render('profil', {name: session.user.nom, privilege: session.user.privilege});

        }
    }).catch(function (error) {
        console.log('pas detruit');
        console.log('req body name : ' + req.body.username);
        res.render('profil', {name: session.user.nom, privilege: session.user.privilege});
    })
};

