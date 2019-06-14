import express from "express";
import path from "path";
import Helmet from "react-helmet";
import htmlTemplate from './template.html.js';
const mongoose = require('mongoose');
const JobModel = require('./model/job');
var cors = require('cors');

const HTTP_OK = 200,
        app = express()
const mongoConnection = process.env.MONGO_CONNECTION
const httpPort = process.env.SERVICE_API_PORT
const router = express.Router();


app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")))


//Est. connection
let db = mongoose.connection;
mongoose.connect(mongoConnection, { useNewUrlParser: true });
db.once('open', () => console.log('Connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * API. Fetch all jobs from Mongo
 */
router.get('/jobs', (req, res) => {
        JobModel.find({}).sort({ updatedat: "desc" }).exec((err, data) => {
                if (err) {
                        return res.json({ success: false, error: err });
                }
                return res.json({ success: true, data: data });
        });
});

/**
 * API.  Remove job by _id
 */
router.delete('/job/:id', (req, res) => {
        JobModel.findByIdAndRemove({ _id: req.params.id }, (err, job) => {
                if (err) {
                        return res.json({ success: false, error: err });
                }
                return res.json({ success: true });
        });
});

/**
 * Get main frontend static template
 */
app.get("/job*", (req, res) => {
        const helmetData = Helmet.renderStatic()
        res.writeHead(HTTP_OK, { "Content-Type": "text/html" })
        res.end(htmlTemplate(helmetData))
});

//Apply API router
app.use('/api', router);
app.listen(httpPort)