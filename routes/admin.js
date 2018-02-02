var express = require('express');
var pageModel = require('../models/page');
var userModel = require('../models/user');
var auth = require('../utils/requireLogin');
var router = express.Router();

router.use(auth.requireLogin);

router.get('/', function(req, res) {
  pageModel.find({"user._id": req.user._id },
  function(err, page){
    if (err){
      return res.send(err);
    };
    // render the dashboard page
    res.render('admin', {
      pages: page
  });
});
});

//add new page button gets here; blank form
router.get('/editPage', function(req, res) {
  res.render('editPage', {
    id: "",
    title: "",
    section_title: "",
    body: "",
    url: "",
    footer: "",
    template: ""
  });
});

//edit existing page
router.get('/editPage/:id', function(req, res){
  pageModel.findOne({
    "user._id": req.user._id,
    _id: req.params.id
  }, function(err, page){
    if (err) return res.send(err);
    if (page){
        res.send(JSON.stringify(page));
    };
  });
});

//find page and update it
router.post('/editCurrentPage/:id', function(req,res){
  setData = {
    "user": req.user,
    "date": new Date(),
    "visible": true
  };
  if (req.body.title) setData["title"] = req.body.title;
  if (req.body.section1_title) setData["section_title"] = req.body.section1_title;
  if (req.body.section1_body) setData["body"] = req.body.section1_body;
  if (req.body.url) setData["url"] = req.body.url;
  if (req.body.footer) setData["footer"] = req.body.footer;
  if (req.body.template) setData["template"] =  req.body.template;

  pageModel.findOneAndUpdate(
    {"user._id": req.user._id, _id: req.params.id},
    {$set: setData
    },
    function(err, page){
      if(err){
        if(err.code === 11000){ //duplicate url
          res.render('editPage', {
            id: "",
            title: req.body.title,
            section_title: req.body.section1_title,
            body: req.body.section1_body,
            url: "",
            footer: req.body.footer,
            template: req.body.template,
            err: `URL (${req.body.url.trim()}) already exists. Enter another`
          })
        }
        return console.error(err);
      }
      else{
        // res.status(200).send(JSON.stringify({
        //   title: req.body.title,
        //   url: req.body.url,
        //   _id: req.params.id
        // }));
        res.status(200).end();
      }

    }
  );
});

//add new page to database
router.post('/addPage', function(req, res) {
    var newPage = new pageModel({
  	title : req.body.title.trim(),
    section_title: req.body.section1_title.trim(),
    body: req.body.section1_body.trim(),
  	url: req.body.url.trim(),
    footer: req.body.footer.trim(),
    template: req.body.template.trim(),
    user: req.user,
    date: new Date(),
    visible: true
    });

    newPage.save(function(err, user){
    	if(err){
        if(err.code === 11000){ //duplicate url
          // res.render('editPage', {
          //   id: "",
          //   title: req.body.title,
          //   section_title: req.body.section1_title,
          //   body: req.body.section1_body,
          //   url: "",
          //   footer: req.body.footer,
          //   template: req.body.template,
          //   err: `URL (${req.body.url.trim()}) already exists. Enter another`
          // })
          err = {
            err: `URL (${req.body.url.trim()}) already exists. Enter another`,
            url: req.body.url.trim()
          }
          res.send(JSON.stringify(err));
        }
        return console.error(err);
      }
      res.send(JSON.stringify(user));
    });
});

router.get('/editAccount', function(req, res){
	res.render('editAccount');
});

router.post('/editCurrentAccount', function(req, res){
  userModel.findOneAndUpdate(
    {_id: req.user._id},
    {$set: {email: req.body.email, password: req.body.password}},
    function(err, user){
      if(err) return console.error(err);
    });

  //update user's pages with new email
  pageModel.updateMany(
    {"user._id": req.user._id},
    {$set: {"user.email": req.body.email}},
    function(err, user){
      if(err) return console.error(err);
      res.redirect('/admin');
    }
  );
});

router.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/auth');
});

router.delete('/deletePage/:id', function(req, res){
  pageModel.remove( {"user._id": req.user._id, _id: req.params.id},
   function(err, isDeleted){
    if(err) return res.status(500).send(err);
    res.end();
  });
});

router.get('/visiblePage/:id', function(req, res){
  pageModel.findOne({"user._id": req.user._id, _id: req.params.id},
    function(err, page){
      if(err) return console.error(err);
      if (page.visible){
        pageModel.findOneAndUpdate(
          {"user._id": page.user._id, url: page.url},
          {$set: {visible: false}},
          function(err, page){
            if(err) return res.status(500).send(err);
            res.send(JSON.stringify({
              "visible" : false,
              "_id" : page._id,
              "url" : page.url,
              "title" : page.title
            }));
          });
      }else{
        pageModel.findOneAndUpdate(
          {"user._id": page.user._id, url: page.url},
          {$set: {visible: true}},
          function(err, page){
            if(err) return res.status(500).send(err);
            res.send(JSON.stringify({
              "visible" : true,
              "_id" : page._id,
              "url" : page.url,
              "title" : page.title
            }));
          });
        };
      }
  );
});

module.exports = router;
