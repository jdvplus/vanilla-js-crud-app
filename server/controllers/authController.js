const authController = {};

// verify that user is valid
authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;

  if (!user || !pass || (user !== 'codesmith' && pass !== 'ilovetesting'))
    return res.status(400).json('unsuccessful login attempt');

  return next();
};

// set cookie on browser upon successful log-in
authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
};

// check if user already logged in
authController.verifyCookie = (req, res, next) => {
  const { token } = req.cookies;

  if (token !== 'admin')
    return res.status(400).json('You must be signed in to view this page');

  return next();
};

module.exports = authController;
