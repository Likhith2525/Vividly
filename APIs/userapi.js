//create mini express application
const exp=require("express")
const userApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken");
const { response } = require("express");

//add body parser middleware
userApi.use(exp.json())

require("dotenv").config()

//get users using async await
userApi.get('/getusers',expressErrorHandler(async (req,res)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    let userList=await userCollectionObj.find().toArray()
    res.send({message:userList})
}))

userApi.get('/getmen',expressErrorHandler(async (req,res)=>{
    let menproductCollectionObj = req.app.get("menproductCollectionObj")
    let userList=await menproductCollectionObj.find().toArray()
   // console.log(userList)
    res.send({message:userList})
}))

userApi.get('/getwomen',expressErrorHandler(async (req,res)=>{
    let womenproductCollectionObj = req.app.get("womenproductCollectionObj")
    let userList=await womenproductCollectionObj.find().toArray()
    //console.log(userList)
    res.send({message:userList})
}))


userApi.get('/getkids',expressErrorHandler(async (req,res)=>{
    let kidsproductCollectionObj = req.app.get("kidsproductCollectionObj")
    let userList=await kidsproductCollectionObj.find().toArray()
    //console.log(userList)
    res.send({message:userList})
}))

userApi.get('/menproductsbyid/:id',expressErrorHandler(async (req,res)=>{
    let menproductCollectionObj = req.app.get("menproductCollectionObj")
    let un=req.params.id;
    //console.log(un)
    //search 
    let userObj=await menproductCollectionObj.find().toArray()
    //console.log(userObj[0].id)
    for(let i in userObj){
        let obj=userObj[i];
        //console.log(obj.id==un)
        if(obj.id==un){
            //console.log(obj)
            res.send({message:obj})
            break
        }
    }
}))


userApi.get('/womenproductsbyid/:id',expressErrorHandler(async (req,res)=>{
    let womenproductCollectionObj = req.app.get("womenproductCollectionObj")
    let un=req.params.id;
    //console.log(un)
    //search 
    let userObj=await womenproductCollectionObj.find().toArray()
    //console.log(userObj[0].id)
    for(let i in userObj){
        let obj=userObj[i];
        //console.log(obj.id==un)
        if(obj.id==un){
            //console.log(obj)
            res.send({message:obj})
            break
        }
    }
}))


userApi.get('/kidsproductsbyid/:id',expressErrorHandler(async (req,res)=>{
    let kidsproductCollectionObj = req.app.get("kidsproductCollectionObj")
    let un=req.params.id;
    //console.log(un)
    //search 
    let userObj=await kidsproductCollectionObj.find().toArray()
    //console.log(userObj[0].id)
    for(let i in userObj){
        let obj=userObj[i];
        //console.log(obj.id==un)
        if(obj.id==un){
            //console.log(obj)
            res.send({message:obj})
            break
        }
    }
}))




//get user by username using async and await
userApi.get('/getusers/:username',expressErrorHandler(async (req,res)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    let un=req.params.username
    //search 
    let userObj=await userCollectionObj.findOne({username:un})
    if(userObj===null){
        res.send({message:"user not existed"})
    }
    else{
        res.send({message:userObj})
    }
}))



//create user using async and await method
userApi.post('/createuser',expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    //get userObj
    let newUser=req.body;
    //search for existing user
    let user=await userCollectionObj.findOne({username:newUser.username})
    //if user existed
    if(user!=null){
        res.send({message:"user already existed"})
    }
    else{
        //hash password
        let hashedPassword=await bcryptjs.hash(newUser.password,7)
        //replace password
        newUser.password=hashedPassword
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({message:"New user created successfully"})
    }
}))


//update user using async and await method
userApi.put('/updateuser/:username',expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    //get modified user
    let modifiedUser=req.body
    //update
    await userCollectionObj.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})
    res.send({message:"user modified successfully"})
}))

//delete user using async and await method
userApi.delete('/deleteuser/:username',expressErrorHandler(async (req,res,next)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    //get username from url
    let un=req.params.username
    let user=await userCollectionObj.findOne({username:un})
    if(user===null){
        res.send({message:"user not existed"})
    }
    else{
        await userCollectionObj.deleteOne({username:un})
        res.send({message:"user deleted successfully"})
    }
}))

//user login
userApi.post('/login', expressErrorHandler(async (req, res) => {
    let userCollectionObj = req.app.get("userCollectionObj")

    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj.findOne({ username: credentials.username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            let signedToken = jwt.sign({ username: credentials.username },process.env.SECRET, { expiresIn: 10 })
            //send token to client
            res.send({ message: "login success", token: signedToken, username: credentials.username, userObj: user })
        }

    }

}))


//add to cart
userApi.post("/add-to-cart", expressErrorHandler(async (req, res, next) => {

    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    let newProdObject = req.body;
    //console.log(newProdObject)

    
    //find usercartcollection 
    let userCartObj = await userCartCollectionObject.findOne({username:newProdObject.username})

    //console.log(userCartObj)
    
    //if userCartObj is not existed
    if (userCartObj === undefined) {

        //create new object
        let products = [];

        products.push(newProdObject.productObject)

        let newUserCartObject = { username:newProdObject.username, products }

        //insert it
        await userCartCollectionObject.insertOne(newUserCartObject)

        let latestCartObj = await userCartCollectionObject.findOne({ username:newProdObject.username })
        res.send({ message: "New product Added", latestCartObj: latestCartObj })

    }
    //if existed
    else {
        //push productObject to products array
        userCartObj.products.push(newProdObject.productObject)
        //update document
        await userCartCollectionObject.updateOne({ username: newProdObject.username }, { $set: { ...userCartObj } })
        let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
        res.send({ message: "New product Added", latestCartObj: latestCartObj })
    }

}))


//get products from user cart
userApi.get("/getproducts/:username", expressErrorHandler(async (req, res, next) => {

    let userCartCollectionObject = req.app.get("userCartCollectionObject")

    let un = req.params.username;

    let userProdObj = await userCartCollectionObject.findOne({ username: un })

    if (userProdObj === null) {
        res.send({ message: "Cart-empty" })
    }
    else {
        res.send({ message: userProdObj })
    }


}))



//dummy route to create protected resourse
userApi.get("/testing",(req,res)=>{
    res.send({message:"This is protected data"})
})


//export userApi
module.exports=userApi;