const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/crud';
const crud_Chat = require('./db');
const bodyparser = require('body-parser');
app.use(express.static(path.join(__dirname, 'themes.2the.me', 'Messenger-1.1')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.set("views", './views');
app.set('view engine', 'ejs');

mongoose.connect(url, {useUnifiedTopology: true});

const con = mongoose.connection;

con.on("open", function(){
	console.log('connected');
})

app.get('/chat', (req, res) => {
	res.render('chat-1.ejs');
})

// app.get('/fetch', (req, res) => {
// 	res.render('chat-2.ejs');
// })

app.post('/chat', async(req, res) => {
	const upload = new crud_Chat({
		msg: req.body.msg
	})
	try{
		const save = await upload.save();
		res.redirect('/chat/fetch');
		res.json(save);
	}catch(err){
		res.send(err);
	}
})

app.get('/chat/fetch', async(req, res, next) => {
	try{
		// let rand = Math.random();
		const fetch = await crud_Chat.find({}).sort({_id:-1}).limit(1);
		res.json(fetch);
		// res.render("/chat", {
		// 		lists: fetch
		// });
	}catch{
		res.send(error);
	}
})

app.listen(9000, function(){
	console.log('stared at 9000');
})