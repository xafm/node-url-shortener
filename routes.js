const express = require('express');
const router = express.Router()
const urlController = require('./controllers/url');
const errorHandler = require('./services/errorHandler').errorHandler


router.get('/', urlController.createUrlView)
router.post('/createUrl', urlController.createUrl)
router.get('/:shortUrl', urlController.redirectToLongUrl)


router.use((req,res) => {
  res.status(404).json('Not Found')
})

router.use(errorHandler)

module.exports = router