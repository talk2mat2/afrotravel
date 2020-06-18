const {getblogpage,createpost,getnewpost ,getpostdetail,commentspost} = require('../controller/blogcontroll')
const express = require('express');
const router = express.Router()


router.post('/blog',createpost)
router.get('/blog',getblogpage)
router.get('/newpost',getnewpost)
router.get('/blog/:id',getpostdetail)
router.post('/blog/:id',commentspost)



module.exports = router