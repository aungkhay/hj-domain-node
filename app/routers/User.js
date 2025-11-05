const express = require('express');

class AdminRoute extends express.Router {
    constructor(app) {
        super();
        
        let MainController = require('../controllers/users/MainController');
        let MainCtrl = new MainController(app);
        this.get('/domains', MainCtrl.DOMAIN_LIST);
    }
}

module.exports = AdminRoute