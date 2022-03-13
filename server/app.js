import express from 'express'
import cors from 'cors';
import connection from './database/db.js';
import router from './route/router.js';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

//router
app.use('/',router);

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});

connection();
