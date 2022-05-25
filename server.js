//create express application
const exp=require("express")
const app=exp();
const path=require("path")


require("dotenv").config()
//connect angular app with express server
app.use(exp.static(path.join(__dirname,"./dist/MyProject1/")))


//import mongoclient
const mc=require("mongodb").MongoClient;


//connection string
//const databaseurl="mongodb+srv://vnr2023:vnr2023@mymongo1.v5zxf.mongodb.net/vividlydb?retryWrites=true&w=majority"
const databaseurl=process.env.DATABASE_URL;
//connect to db
mc.connect(databaseurl,{useNewUrlParser:true, useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("error in database connection",err)
    }
    else{
        //get database object from client object
        let databaseObj=client.db("vividlydb")
        //create user collection object
        let userCollectionObj=databaseObj.collection("usercollection")
        
        let userCartCollectionObject = databaseObj.collection("usercartcollection")
        app.set("userCollectionObj", userCollectionObj)

        let menproductCollectionObj=databaseObj.collection("menproducts")
        app.set("menproductCollectionObj", menproductCollectionObj)

        let womenproductCollectionObj=databaseObj.collection("womenproducts")
        app.set("womenproductCollectionObj", womenproductCollectionObj)

        let kidsproductCollectionObj=databaseObj.collection("kidsproducts")
        app.set("kidsproductCollectionObj", kidsproductCollectionObj)

        app.set("userCartCollectionObject", userCartCollectionObject)
        console.log("connected to database successfully")
    }
})


//connect angular app with express server
app.use(exp.static(path.join(__dirname,"./dist/MyProject1/")))


//import APIs
const userapi=require("./APIs/userapi")

//execure specific api based on path
app.use('/user',userapi)

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'dist/myProject1/index.html'), function(err){
        if(err){
            res.status(500).send(err)
        }
    })
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:`error is ${err.message}`})
})


//invalid path
app.use((req,res,next)=>{
    res.send({message:`path ${req.url} is invalid`})
})



//assign port
const port=process.env.PORT || 8080;
app.listen(port,()=>console.log(`server is listening on port ${port}`))




