require('dotenv').config();
const database = require('./database'); 
const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(helmet());

app.get('/database/:h', async (req, res, next) => {
    try {
        const hashParam = req.params.h.toString();
        if (!hashParam) {
            return res.status(404).json({ error: "Inválido" });
        }
        
        let q = "SELECT * from lead WHERE key_hash = $1";
        let params = [hashParam];
        let result = await database(q, params);
        
        if (result.length > 0) {
            res.status(200).json({ result: true, data: result });
        } else {
            res.status(401).json({ result: false });
        }
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT_SERVER || 3000;
app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});
