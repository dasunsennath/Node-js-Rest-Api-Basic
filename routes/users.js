var express = require('express');
var User = require('../Modules/User');
var bodyparser = require('body-parser');

const passport = require('passport');
var authenticate = require('../authenticate');
var router = express.Router();

router.use(bodyparser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signUp',(req,res,next)=>
{
  User.register(new User({username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname,age:req.body.age}),req.body.password,(err,user)=>
  {
     if(err)
     {
        res.statusCode=500;
        res.setHeader('Content-Type','application/json');
        res.json({err:err});
     }
     else{
      passport.authenticate('local')
      (req,res,()=>
      {
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({success:true, status:'Create accout successfully'});

      })
     }
  })
});

router.post('/singIN',passport.authenticate('local') ,(req,res,next)=>
{
   var token = authenticate.getToken({_id:req.user._id});
   res.statusCode=200;
   res.setHeader('Content-Type','application/json');
   res.json({ success:true ,token:token ,status:'You are sing in'});
})

module.exports = router;
