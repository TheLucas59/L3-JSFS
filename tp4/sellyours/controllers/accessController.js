const userSchema = require('../models/User').model
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');


const register = async (req, res) => {
  // hash password using bcrypt
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const userData = {
                        login : req.body.login,
                        password: hashPassword,   // replace password by crypted version
                        balance : 100
                     };
    const newUser = await userSchema.create(userData); // save user in the database
    delete userData.password;                    // password is not sent back in request
    res.status(201).json(userData);
  }
  catch (err){
    res.status(409).json({ message : err.message });
  }
}

const login = async (req, res) => {
    try {
      // check if user exist
      const user = await userSchema.findOne( { login : req.body.login });
      if (user) {
        // check password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) // wrong password
          return res.status(401).json({ message : 'mot de passe incorrect.'});
  
        // create and send token
        const token = jwt.sign({id: user._id}, jwtConfig.SECRET_TOKEN, {expiresIn : '60s'} );
        res.cookie('token', token,  { maxAge : 60000, httpOnly: true, sameSite : 'strict' })  // secure : true (avec https)
        res.status(200).json({ message : 'utilisateur connecté' });
      }
      else { // unknown login
        console.log(`user ${req.body.login} inconnu`);
        res.status(401).json({ message : `utilisateur ${req.body.login} inconnu`});
      }
    }
    catch (err) {
      console.log(`pb connexion ${err.message}`);
      res.status(500).redirect('/access/register');
    }
  }  

const loginForm = (_,res) => res.redirect('/login.html');

const registerForm = (_,res) => res.redirect('/register.html');

const logout = (req,res) => {
  res.cookie('token', '',  { maxAge : 2000, httpOnly: true, sameSite : 'strict' }) // secure : true
  res.render('logout')
  res.status(200).json({ message : 'utilisateur déconnecté' });
}

module.exports.loginForm = loginForm
module.exports.login = login
module.exports.registerForm = registerForm
module.exports.register = register
module.exports.logout = logout
