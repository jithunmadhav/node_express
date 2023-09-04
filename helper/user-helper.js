const db=require('../config/connection')
const collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { response } = require('express')
const { ObjectId, ObjectID } = require('mongodb')
const objectId=require('mongodb').ObjectID
module.exports={

    //User-SignUp

    userSigup:(userData)=>{
        return new Promise(async(resolve, reject) => {
            userData.password=await bcrypt.hash(userData.password,10)
        db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{

            resolve(data)

        })
        })
       

    },

    //User-Login

    userLogin:(userData)=>{
         return new Promise(async(resolve, reject) => {
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.Email})
         
            if(user){
            var status =await bcrypt.compare(userData.password,user.password)
            if(status){
                console.log(status);
                response.user=user
                response.status=status
                resolve(response)
            }else{
                console.log("login denied");
                resolve({status:false})
            }
            }else {
                console.log("login failed");
                resolve({status:false})
            }

        });
        

    },

    //Admin-getData

    getAllData:()=>{
        return new Promise(async(resolve, reject) => {
            let data=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(data)
        });
    },

    //Delete-user

    deleteUser:(userId)=>{
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
                resolve(response)
            })
        });
    },

//Edit-user

    editUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(id)}).then((data)=>{
            resolve(data);
           // console.log(data);
        }); 
        })
    },
    editUserDetails:(id,data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id: objectId(id)},{
                $set:{
                    name:data.name,
                    email:data.email,
                    phone:data.phone
                }
            }).then((response)=>{
               // console.log(response);
                resolve();
            });
        });
    },


// search-User

    findUserWithName:({name})=>{
        console.log("Name : "+name)
        return new Promise(async(resolve, reject) => {
            try{
                let users= await db.get().collection(collection.USER_COLLECTION).find({$or:[{name:new RegExp(name) },{phone:name}]}).toArray()
                if(users){
                    resolve(users)
                    console.log(users);
                }else{
                    reject()
                }
            }catch(err){
                reject(err)
            }
        });

    }
}