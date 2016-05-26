var express = require('express');
var app = express();

<<<<<<< HEAD
app.use(express.static('client/www'));
app.use('/admin', express.static('admin/app'));
=======
app.use(express.static('www'));
>>>>>>> origin/master

app.listen(process.env.PORT, function() {
  console.log('Server up');
});
