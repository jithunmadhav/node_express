const { response } = require('express');
var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
const userHelper=require('../helper/user-helper')
var session;
const admin={
    email:"admin@gmail.com",
    password:"123456"
}


router.get('/adm',(req,res)=>{
    if(req.session.adminid){

    res.redirect('/home')
    }else
    res.render('adminLogin')
})

router.get('/home',(req,res)=>{
    if(req.session.adminid){
        userHelper.getAllData().then((data)=>{
            res.render('adminHome',{data})
        })
       
    }
   
  })
  
 router.post('/adminLog',(req,res)=>{

    if((admin.email==req.body.Email)&&(admin.password==req.body.password)){
 req.session.adminid=req.body.Email;
  res.redirect('/home')

    }else{
        res.redirect('/adm')
    }
 })
  
//create-user

 router.get('/create',(req,res)=>{
    res.render('createUser')
 })
 router.post('/create',(req,res)=>{

    userHelper.userSigup(req.body).then((response)=>{
        console.log(response);
      })
      res.redirect('/home')
    })


    //Delete-User

router.get('/deleteUser/:id',(req,res)=>{
    if(req.session.adminid){
        let userId=req.params.id
// console.log(userId);
userHelper.deleteUser(userId).then((response)=>{
    res.redirect('/home')
})
    }

})

//edit-user
router.get('/editUser/:id',(req,res)=>{  
  if(req.session.adminid){
    let userId = req.params.id 
    userHelper.editUser(userId).then((data)=>{
      res.render('editUser',{data})
    })
  }
   
   
  })

  router.post('/edit-User/:id',(req,res)=>{
    let id = req.params.id 
    console.log(req.body);
    userHelper.editUserDetails(id,req.body).then(()=>{
      res.redirect('/home');
    });
  });


//Search-User

 router.get('/searchUser',(req,res)=>{
    if(req.session.adminid){
        console.log("Search body"+req.query);

        userHelper.findUserWithName(req.query).then((data)=>{
           // console.log("User: "+data);
           res.render('adminHome',{data})
        })
    }


 })

 //Louout

 router.get('/log',(req,res)=>{
    req.session.adminid=null;
    res.redirect('/adm')
 })

  

module.exports = router;