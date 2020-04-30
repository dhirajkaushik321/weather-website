console.log('Javascript service for browser');
// Submitting a forms
const search=document.querySelector('input');
const messageOne=document.querySelector('#messageOne');
const messageTwo=document.querySelector('#messageTwo');
const messageThree=document.querySelector('#messageThree');
const messageFour=document.querySelector("#messageFour");
const weatherImg=document.querySelector('img');
document.querySelector('form').addEventListener('submit', (e)=>{
	e.preventDefault();
	const location=search.value;
	messageOne.classList.toggle('loading');
	messageOne.classList.toggle('infoElement');
	messageOne.textContent="Loading..."
	messageTwo.textContent='';
	messageThree.textContent='';
	messageFour.textContent='';
	document.querySelector('.form div').classList.remove('info');
	fetch('/weather?address='+location).then((response)=>{
	response.json().then((data)=>{
		document.querySelector('.form div').classList.add('info');
		messageOne.classList.toggle('loading');
		messageOne.classList.toggle('infoElement');
		if(data.error){
			weatherImg.classList.toggle('weatherIconInvisible');
			messageOne.textContent=data.error;	
		}
		else{
			weatherImg.classList.toggle('weatherIconInvisible');
			weatherImg.setAttribute('src',data.weatherImage);
			messageOne.innerHTML="<span class='title'>Location:&ensp;</span>"+data.city;
			messageTwo.innerHTML="<span class='title'>Description:&ensp;</span>"+data.description;
			messageThree.innerHTML="<span class='title'>Temperature:&ensp;</span>"+data.temp;
			messageFour.innerHTML="<span class='title'>Country:&ensp;</span>"+data.country;

			}
					
	})
})
})