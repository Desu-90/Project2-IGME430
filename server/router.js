const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.get('/login', controllers.Account.loginPage);
  // app.post('/login', controllers.Account.login);
//
  // app.get('/signup', controllers.Account.signupPage);
  // app.post('/signup', controllers.Account.signup);
//
  // app.get('/logout', controllers.Account.logout);
//
  // app.get('/maker', controllers.Domo.makerPage);
  // app.post('/maker', controllers.Domo.makeDomo);
//
  // app.get('/', controllers.Account.loginPage);

  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getPost', mid.requiresLogin, controllers.Post.getPost);

  app.get('/movie', controllers.Movie.moviePage);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/main', mid.requiresLogin, controllers.Post.mainPage);
  app.post('/main', mid.requiresLogin, controllers.Post.makePost);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
