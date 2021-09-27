const  express = require('express');
const prodcut = require('../Modules/prodcut');
const ProductRoure = express.Router();
const Products = require('../Modules/prodcut');
const authenticate  = require('../authenticate');
// const bodyparser = require('body-parser');
// ProductRoure.use(bodyparser.json());

ProductRoure.route('/')
.get((req,res,next)=>
{
    Products.find({})
    .then((products)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(products);
    },(err)=>next(err))
    .catch((err) => next(err));
    // res.end('this the Get Request from : / Product');
})
.post(authenticate.verify,authenticate.verifyAdmin, (req,res,next)=>
{
   Products.create(req.body)
   .then((product)=>
   {
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(product);
   },(err)=>next(err))
   .catch((err) => next(err));

    // res.end('The input is passed to db  details : '+ req.body.name  +' address : '+ req.body.address);
})
.put(authenticate.verify,authenticate.verifyAdmin,(req,res,next)=>
{
    res.statusCode=403;
    res.setHeader('Content-Type','text/plain');
    res.end('The PUT method is not supported for : /product');
})
.delete(authenticate.verify,authenticate.verifyAdmin,(req,res,next)=>
{
     prodcut.remove({})
     .then((remove)=>
     {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(remove);
     },(err)=>next(err))
     .catch((err)=>next(err));
});


ProductRoure.route('/:producID')
.get((req,res,next)=>
{
    Products.findById(req.params.producID)
    .then((product)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(product);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.post(authenticate.verify,authenticate.verifyAdmin,(req,res,next)=>
{
    res.statusCode=403;
    res.setHeader('Content-Type','text/plain');
   res.end('The POST method is not allow for /Product/'+req.params.producID);
})
.put(authenticate.verify,authenticate.verifyAdmin,(req,res,next)=>
{
    Products.findByIdAndUpdate(req.params.producID,{$set:req.body},{new:true}).exec()
    .then((update)=>
    {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(update);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verify,authenticate.verifyAdmin,(req,res,next)=>
{
     prodcut.findByIdAndDelete(req.params.producID)
     .then((remove)=>
     {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(remove);
     },(err)=>next(err))
     .catch((err)=>next(err));
});

   


module.exports = ProductRoure;


