const urlService = require('../services/url')
const axios = require('axios')

exports.createUrl = async (req, res, next) => {
  try {
    const result = await urlService.createUrl(req.body.url)
    // res.status(201).json({
    //   status: 'success',
    //   message: result.message,
    //   url: result.url,
    // })
    res.render('createdUrl', {url: result.url})
  } catch (error) {
    return next(error)
  }
}

exports.redirectToLongUrl = async (req, res, next) => {
  try {
    const longUrl = await urlService.getLongUrl(req.params.shortUrl)
    urlService.addCountToUrl(longUrl)
    // const response = await axios.get(longUrl)
    res.render('redirecterPage', {shortUrl: longUrl})
  } catch (error) {
    // console.log(error.message)
    return next(error)
  }
}

exports.createUrlView = (req, res) => {
  res.render('createUrl')
}
