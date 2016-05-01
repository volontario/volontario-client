var express = require('express');
var app = express();

app.use(express.static('www'));

app.listen(process.env.PORT, function() {
  console.log('Server up');
});
