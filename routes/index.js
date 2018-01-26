var express = require('express');
var pagesModel = require('../models/page');
var auth = require('../utils/requireLogin');
var router = express.Router();

router.use(auth.requireLogin);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/auth');
});

router.get('/:page', function(req, res){
  pagesModel.findOne({ url: req.params.page.trim() },
  function(err, currentPage){
    if (err) return res.send(err);
    pagesModel.find({"user._id": req.user._id },
    function(err, page){
      if (err){
        return res.send(err);
      };
      if(currentPage && currentPage.visible){
       res.render('template', {
         pages: page,
         title: currentPage.title,
         section_title: currentPage.section_title,
         body: currentPage.body,
         footer: currentPage.footer
       });
     }else{
       res.status(404).send('404 - Not found');
     }
  });
});
});
module.exports = router;
