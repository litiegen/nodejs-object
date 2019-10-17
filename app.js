const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const {chapterList} = require('./data')

var app = express();
app.use(bodyParser());
app.use(express.static('allfile'));

app.get('/',(req,res)=>{
    res.type('text/plain');
    res.status(200);
    res.send('successful');
})
//进入登录页
app.get('/login/',(req,res)=>{
    var fileContent = fs.readFileSync(__dirname+'\\login.html');
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
});
//判断是否登录成功
var userList = [
    {username: "admin", pwd: "admin"}
]
app.get('/listmanager/',(req,res)=>{
    // console.log(req.query.yhm);
    // console.log(userList[0].username);
    if(req.query.yhm == userList[0].username && req.query.mm == userList[0].pwd){
        var fileContent = fs.readFileSync(__dirname+'\\list.html');
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end(fileContent)
    }
    else{
        res.send("Login failed");
    }
})
//list页面
app.get('/list/',(req,res)=>{
    var fileContent = fs.readFileSync(__dirname+'\\chapterList.html');
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent);
})
//文章列表
var Chapter1 = {}
app.get('/detail',(req,res)=>{
    if(req.query.again){
        res.type('text/json');
        res.status(200);
        res.send(Chapter1);
        console.log(Chapter1);
    }else{
        var fileContent = fs.readFileSync(__dirname+'\\chapter.html');
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        res.end(fileContent);
        for(var i in chapterList){
            if(chapterList[i].chapterId == req.query.chapterId){
                Chapter1 = chapterList[i];
            }
        }
    }
})
//添加list文章以及后台
app.post('/add/',(req,res)=>{
    var addlist = {}
    addlist.chapterId=chapterList.length+1;
    addlist.chapterName=req.body.chapterName;
    //console.log(addlist.chapterName);
    addlist.chapterDes=req.body.chapterContent.slice(0,10);
    addlist.chapterContent=req.body.chapterContent;
    addlist.publishTimer= new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate();
    addlist.author="李铁根";
    addlist.views=102;
    addlist.imgPath='/images/1-1.jpg';
    chapterList.push(addlist);
    var fileContent = fs.readFileSync(__dirname+'\\list.html');
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent)
})

app.get('/addChapter/',(req,res)=>{
    var fileContent = fs.readFileSync(__dirname+'\\addChapter.html');
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end(fileContent)
})

app.get('/article/', (req, res) => {
    res.send(chapterList);
})

app.get('/list/css/base.css',(req,res)=>{
    res.send(chapterList);
})

app.listen(8083);