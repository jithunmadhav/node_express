const { response } = require('express');
var express = require('express');
var router = express.Router();
const userHelper=require('../helper/user-helper')

router.get('/signup', function(req, res, next) {
  if(req.session.userid){
    res.redirect('/')
  }else
  res.render('signUp');
});
router.post('/sign_up',(req,res)=>{
  console.log("DATA : "+req.body);
  userHelper.userSigup(req.body).then((response)=>{
    console.log(response);
  })
  res.redirect('/')
})



/* login pge. */

var session;
var product;
router.get('/', function(req, res) {
  session=req.session;
  // console.log(session)
  if(session.userid){
    console.log(session.name);
    
    res.redirect('/in');
  }else{
    console.log("Activated")
    res.render('index');
  }
 
});

router.get('/in',(req,res)=>{
  if(req.session.userid){
    res.render('inner',{product:req.session.name});
  }
 
})

//inner page

router.post('/login',(req,res)=>{
userHelper.userLogin(req.body).then((response)=>{
  if(response.status){
   
  
   req.session.userid=response.user.email;
   req.session.name=response.user.name;
   res.redirect('/in')

  }
  else{
  res.redirect('/')
  }
})
})


//logout
router.get('/logout',(req,res)=>{
  
  req.session.userid=null;
  res.redirect('/')
})


module.exports = router;
