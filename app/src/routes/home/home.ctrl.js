"use strict";

const User = require("../../models/User");
const UserStorage = require("../../models/UserStorage");
const { spawn } = require('child_process');
const fs = require('fs');
const iconv = require('iconv-lite');
const { stringify } = require("querystring");


const output = {
    home: (req, res) => {
        res.render("home/index");
    },
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    output: (req, res) => {
        res.render("home/output");
    },
    upload: (req, res) => {
        res.render("home/upload");
    },
    script1: (req, res) => {
        let data1;
        const pythonOne = spawn('python', ['./src/public/python/script1.py']);
        pythonOne.stdout.on('data', function(data) {
            data1 = data.toString();
        })
        pythonOne.on('close', (code) => {
            console.log("code", code);
            console.log(typeof data1);
            res.send(data1);
        })
        pythonOne.stderr.on('data', function(data) {
            console.error(data.toString());
        });
    },
    check: (req, res) => {
        res.render("home/check");
    },
    response: (req, res) => {
        res.render("home/response");
    },
    response_explain: (req, res) => {
        res.render("home/response_explain");
    },
}

const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async(req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    output: async(req, res) => {
        let content = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain.txt');
        let utf8Str = iconv.decode(content, 'euc-kr');
        let content2 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain2.txt');
        let utf8Str2 = iconv.decode(content2, 'euc-kr');
        let content3 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain3.txt');
        let utf8Str3 = iconv.decode(content3, 'euc-kr');
        let content4 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain4.txt');
        let utf8Str4 = iconv.decode(content3, 'euc-kr');
        let content5 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain5.txt');
        let utf8Str5 = iconv.decode(content3, 'euc-kr');
        let content6 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain6.txt');
        let utf8Str6 = iconv.decode(content3, 'euc-kr');
        let content7 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain7.txt');
        let utf8Str7 = iconv.decode(content3, 'euc-kr');
        let content8 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain8.txt');
        let utf8Str8 = iconv.decode(content3, 'euc-kr');
        let content9 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain9.txt');
        let utf8Str9 = iconv.decode(content3, 'euc-kr');
        let content10 = fs.readFileSync('./ml_files/explain_long_term_work/강남역_치킨/explain10.txt');
        let utf8Str10 = iconv.decode(content3, 'euc-kr');

        let string = utf8Str + '\n' + '\n' + utf8Str2 + ' \n' + '\n' + utf8Str3 + ' \n' + '\n' + utf8Str4 + '\n' + ' \n' + '\n' + '\n' + utf8Str5 + ' \n' + '\n' + utf8Str6 + ' \n' + '\n' + utf8Str7 + '\n' + '\n' + utf8Str8 + ' \n' + '\n' + utf8Str9 + ' \n' + '\n' + utf8Str10;
        console.log(string);
        return res.send(JSON.stringify(string));
    },
    upload: (req, res) => {
        res.render("home/check");
    },
    response: async(req, res) => {
        let data1;
        console.log(req.body.address, req.body.type);
        console.log("analyze 시작")
        const pythonOne = await spawn('python', ['./ml_files/analyze_long_term.py', req.body.address, req.body.type]);
        console.log("analyze 끝")

        pythonOne.stdout.on('data', function(data) {
            data1 = iconv.decode(data, 'euc-kr');
        })
        pythonOne.on('close', (code) => {
            return res.send(JSON.stringify(data1));
        })
        pythonOne.stderr.on('data', function(data) {
            console.error(data.toString());
        });
    },
    response_explain: async(req, res) => {
        let data1;
        console.log(req.body.address, req.body.type);
        console.log("explain 시작")
        const pythonOne = await spawn('python', ['./ml_files/explain_long_term.py', req.body.address, req.body.type]);
        console.log("explain 끝")
        pythonOne.stdout.on('data', function(data) {
            data1 = iconv.decode(data, 'euc-kr');
        })
        pythonOne.on('close', (code) => {
            return res.send(JSON.stringify(data1));
        })
        pythonOne.stderr.on('data', function(data) {
            console.error(data.toString());
        });
    },
};

module.exports = {
    output,
    process,
};
// {key: key}
// {
//     home: home,
//     login: login,
// }