var express = require('express');
var pagesModel = require('../models/page');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:page', function(req, res){
  pagesModel.findOne({ url: req.params.page.trim() },
  function(err, page){
    if (err) return res.send(err);
    if(page){
      res.render('template', {
        title: page.title,
        section_title: page.section_title,
        body: page.body,
        footer: page.footer
      });
    }else{
      res.status(404).send('404 - Not found');
    }
  })
});
module.exports = router;
