const express = require('express');

class AdminRoute extends express.Router {
    constructor(app) {
        super();

        let FormValidator = require('../helpers/FormValidator.Admin');

        let MiddleWare = require('../middlewares/AdminMiddleware');
        let middleware = new MiddleWare(app);

        let AuthController = require('../controllers/admins/AuthController');
        let AuthCtrl = new AuthController(app);

        this.get('/get-recaptcha', AuthCtrl.GET_RECAPTCHA);
        this.post('/login', FormValidator.login(), AuthCtrl.LOGIN);
        this.get('/profile', middleware.isLoggedIn, AuthCtrl.PROFILE);
        this.post('/logout', middleware.isLoggedIn, AuthCtrl.LOGOUT);

        let DomainController = require('../controllers/admins/DomainController');
        let DomainCtrl = new DomainController();

        this.get('/domains', middleware.isLoggedIn, DomainCtrl.INDEX);
        this.post('/domains/create', FormValidator.create_domain(), middleware.isLoggedIn, DomainCtrl.CREATE);
        this.post('/domains/:id/update', FormValidator.create_domain(), middleware.isLoggedIn, DomainCtrl.UPDATE);
        this.post('/domains/:id/change-status', FormValidator.update_status(), middleware.isLoggedIn, DomainCtrl.UPDATE_STATUS);
        this.post('/domains/:id/delete', middleware.isLoggedIn, DomainCtrl.DELETE);
    }
}

module.exports = AdminRoute