const app = require('./app');
const dotenv = require('dotenv')
const connectDataBase = require('./config/database');

//handling uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shuting down the server due to unhandled exception.`);
})

//Config 
dotenv.config({path: 'config/config.env'})

//connecting database 
connectDataBase()
const server = app.listen(process.env.PORT=4001,() => {
    console.log(`server is running at ${process.env.PORT}`);
})

//handling unhandleds rejection
process.on('unhandledsRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`shuting down the server due to unhandled Promise rejection`);
    server.close(() => {
        process.exit();
    });
});