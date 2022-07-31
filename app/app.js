"use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//

//라우팅
const home = require("./src/routes/home"); //ctrl이 있는 파일을 명시 해준다


//앱 세팅
app.set("views", "./src/views"); //views생성 관리해줄 파일 경로 두번째 파라미터
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`)); //__dirname은 현제 app.js파일이 있는 위치를 말한다
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home); //use -> 미들 웨어를 등록해주는 메서드
//  루트경로로 들어오면 home으로 보내준다


module.exports = app;