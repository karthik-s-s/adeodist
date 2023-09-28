var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const fs = require('fs');
const fs = require('fs-extra');
const cron = require('node-cron');
require('dotenv').config();


//routes
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var superAdminsRouter = require('./routes/superAdmin');

var app = express();
//server creation
var PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//code for logging
const logDirectory = __dirname + '/logs';

// Create the log directory if it doesn't exist
fs.ensureDirSync(logDirectory);

let currentLogFileName = generateLogFileName();

// Middleware to log operations
app.use((req, res, next) => {
  const currentTime = new Date();
  const logFileName = generateLogFileName(currentTime);

  // If the log file for the current time has changed, update the currentLogFileName
  if (logFileName !== currentLogFileName) {
    currentLogFileName = logFileName;
  }

  const logEntry = `${currentTime} - ${req.method} ${req.url}\n`;

  fs.appendFileSync(currentLogFileName, logEntry);

  next();
});

// Generate a log file name based on the given time (or the current time)
function generateLogFileName(time = new Date()) {
  const year = time.getFullYear();
  const month = (time.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
  const day = time.getDate().toString().padStart(2, '0');
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = Math.floor(time.getMinutes() / 5) * 5; // Round down to nearest 5 minutes
  const minuteStr = minute.toString().padStart(2, '0');

  return `${logDirectory}/log_${year}${month}${day}_${hour}${minuteStr}.txt`;
}
//end

// Schedule log cleanup task (every 30 seconds)
cron.schedule('*/30 * * * * *', () => {
  //'*/30 * * * * *' runs every 30 seconds.
  //'0 */30 * * * *' runs every 30 minutes.
  console.log('Running cron job');
  const files = fs.readdirSync(logDirectory);

  files.forEach((file) => {
    const filePath = `${logDirectory}/${file}`;
    const fileStat = fs.statSync(filePath);
    const currentTime = Date.now();
    const fileCreationTime = fileStat.ctime.getTime();

    if (currentTime - fileCreationTime > 30  *1000) {
      console.log("unlink");
      fs.unlinkSync(filePath);
    }
  });
});

// end

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/superAdmin', superAdminsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
