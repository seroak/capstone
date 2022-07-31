"use strict";
const express = require("express");
const router = express.Router();
const app = express();

const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage })
const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/script1", ctrl.output.script1);
router.get("/output", ctrl.output.output);
router.get("/upload", ctrl.output.upload);
router.get("/response", ctrl.output.response);
router.get("/response_explain", ctrl.output.response_explain);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/output", ctrl.process.output);
router.post("/upload", upload.single('up_file'), ctrl.process.upload);
router.post("/response", ctrl.process.response);
router.post("/response_explain", ctrl.process.response_explain);
module.exports = router;