// const popups = require('popups');

module.exports = {
    ensureAuth: (req,res,next)=>{
        if (req.isAuthenticated()){
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
            return next()
        }
        else{
            console.log("Please login first");
            res.redirect('/login');
        }

    }, 
    ensureGuest: (req,res,next)=>{
        if (req.isAuthenticated()){
            res.redirect('/HomeafterLogin');
        }
        else{
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
            return next()
        }

    }
}