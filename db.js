const mongoose = require('mongoose')
const express = require('express');

mongoose.set('useCreateIndex', true) 

module.exports.connect = ({expressApp}) => {
  mongooseConnect()

  mongoose.set('useFindAndModify', false);

  mongoose.connection
  .on('error', (err) => {
    console.log('MongoDB connection error.');
    process.exit();
  })
  .on('disconnected', mongooseConnect)
  .once('open', () => {
    expressApp.emit('db_connected')
  })
  .on('connected', () => {
    console.log(('MongoDB connected'))
  });
}

function mongooseConnect(){
  mongoose.connect(process.env.CONNECTION_STRING, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log(error.message);
  })
}