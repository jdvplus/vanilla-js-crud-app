const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;

  if (user !== 'codesmith' && pass !== 'ilovetesting') {
    return res.status(400).json('unsuccessful login attempt');
  }

  return next();
};

module.exports = authController;
