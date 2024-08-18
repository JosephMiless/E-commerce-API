// import { sessionStore } from './mysqlStore/mysqlStore.js';
// import mysql from 'mysql';
// import session from "express-session";
// import MySQLStore from "express-mysql-session";
// import { config } from "../config/env.js";

// const mysqlStore = MySQLStore(session);

// const options = {
//     connectionLimit: 100,
//     password: config.db.password,
//     user: config.db.user,
//     database: config.db.database,
//     host: config.db.host,
//     port: config.port,
//     createDatableTable: true
// };

// const sessionConnection = mysql.createConnection(options);

// export const sessionStore = new mysqlStore({
//     expiration: 10800000,
//     createDatabaseTable: true,
//     schema: {
//         tableName: "sessionTable",
//         columnNames: {
//             session_id: "session_id",
//             expires: "expires",
//             data: "data"
//         }
//     }
// }, sessionConnection);

// app.use(session({
    
//     secret: config.rsecret,
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore,
//     // cookie: {
//     //     httpOnly: true,
//     //     maxAge: ONE_DAY,
//     //     sameSite: true,
//     //     secure: IS_IN_PROD,
//     //   }
// }));

// app.get('/', (req, res) => {
//     //req.session.isAuth = true
//     console.log(req.session);
//     console.log(req.session.id);
//      res.send("Testing session")
// });
