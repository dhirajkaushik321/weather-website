const path=require('path');
const express=require('express');
const hbs=require('hbs');
const myWeather=require('./utils/weather.js');
const app=express();
//Define paths for express congig
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials')
//settting view engine to render dynamic hbs pages and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);
//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("/",(req,res)=>{
	res.render('index',{
		title:"Weather"
	});
})
app.get("/about",(req,res)=>{
	res.render('about',{
		title:'About me',
		name:'Dhiraj kaushik'
	})
})
app.get("/help",(req,res)=>{
	res.render('help',{
		title:'Help page',
	})
})
app.get('/weather',(req,res)=>{
	const address=req.query.address;
	if(!address){
		return res.send({error:'No address is provided'});
	}
	myWeather.weatherData(address,(error,response,flag)=>{
		if(flag){
			return res.send(response);
		}
		res.send({error:error});
	})
	
})
app.get('/help/*',(req,res)=>{
	res.render('page404',{
		title:"404",
		errorMessage:"Help article not found"
	});
})
app.get('*',(req,res)=>{
	res.render('page404',{
		title:'404',
		errorMessage:"Page not found"
	});
})
app.listen(3000,()=>{
	console.log("Server is running on port no 3000");
})