const nanoid = require('nanoid').nanoid
const {InternalError, GeneralError} = require('./errorHandler').errorTypes
const Url = require('../models/Url')
const axios = require('axios');

exports.createUrl = async longUrl => {
  try {
    try {
      await axios.get(longUrl)
    } catch (error) {
      throw new Error('Invalid link')  
    }

    const existingUrl = await Url.findOne({longUrl})
    if (existingUrl) {
      return {url: existingUrl.shortUrl}
    }

    const newUrl = new Url({
      shortUrl: nanoid(10),
      longUrl: longUrl,
      count: 0,
    })

    const createdUrl = await newUrl.save()
    return {
      url: createdUrl.shortUrl,
      message: 'Url has been successfully created',
    }
  } catch (error) {
    throw new InternalError(error)
  }
}

exports.getLongUrl = async shortUrl => {
  try {
    const existingUrl = await Url.findOne({shortUrl})
    if (!existingUrl) {
      throw new Error('Link does not exist')
    }
    return existingUrl.longUrl
  } catch (error) {
    throw new GeneralError(error)
  }
}

exports.addCountToUrl = async longUrl => {
  Url.findOneAndUpdate({longUrl}, {$inc: {count: 1}}, function (err, response) {

  })
}
