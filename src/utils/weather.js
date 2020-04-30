const request =require('request');
const weatherData=(city,callback)=>{
	const url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=bde1822926a239ef3ff97b6f8bcf030b&units=metric';
	request({url,json:true},(error,{body}={})=>{
	let err='undefined';
	let res='undefined';
	let flag;
	if(error){
		err='Unable to connect to weather service';
		flag=0;
	}
	else if(body.cod==='404'){
		err='City not found';
		flag=0;
	}
	else{
		const { description,icon}=body.weather[0];
		const {temp}=body.main;
		const city=body.name;
		const country=body.sys.country;
		const weatherImage= 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
		res={
			description,temp,weatherImage,city,country
		}
		flag=1;
	}
	callback(err,res,flag);
})
}
module.exports={
	weatherData
}