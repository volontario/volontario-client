var express = require('express');
var app = express();

app.use(express.static('client/www'));
app.use('/admin', express.static('admin/dist'));

app.listen(process.env.PORT, function() {
  console.log('Server up');
});
