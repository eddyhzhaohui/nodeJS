var express = require('express');
var router = express.Router();


router.init = function(cfg){
    console.log('index router.init', cfg);
};

/* GET player page. */
router.get('/', function(req, res, next) {
    res.redirect('/player.html')
});


router.post('/list', function(req, res, next) {
    
    res.json({
        code: 0,
        msg: ok,
        data: 'hello'
    }).end();

});

module.exports = router;
