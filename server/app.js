import express from 'express'
import cors from 'cors';
import connection from './database/db.js';

const app = express();
const PORT = 8000;

app.use(cors());

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});

connection();
