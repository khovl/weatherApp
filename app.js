let search = document.querySelector(".search")
let city = document.querySelector(".city")
let country = document.querySelector(".country")
let value = document.querySelector(".value")
let desc = document.querySelector(".desc")
let vision = document.querySelector(".vision span")
let wind = document.querySelector(".speed-wind span")
let content = document.querySelector(".content")
let humidity = document.querySelector(".humidity span")
let day= document.querySelector('.day')
let date= document.querySelector('.date')
let time = document.querySelector('.time')
let body = document.querySelector('body')
//code tro ly ảo
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition= new SpeechRecognition();
recognition.lang = 'vi-VI';
recognition.continuous = false;
const micro = document.querySelector('.micro');


async function changeWhetherUI(locationSearch){
 
    let api= `https://api.openweathermap.org/data/2.5/weather?q=${locationSearch}&appid=28eb82cd0b29e5a915fa8f922b8504a6`
   const res = await fetch(api)
   const data = await res.json()

   if (data.cod == 200){
    content.classList.remove('hide')
        city.innerText= data.name
        country.innerText= data.sys.country
        vision.innerText= data.visibility + "m" 
        wind.innerText=data.wind.speed +'m/s'
        humidity.innerText=data.main.humidity +'%'
        let temp = Math.round((data.main.temp)-273.15)
        
        value.innerText = temp
        desc.innerText= data.weather[0]?data.weather[0].main:'';
        day.innerText= new Date().toDateString('vi')
    
        // body.setAttribute('class','hot')
        if( temp >= 30){
            body.setAttribute('class','hot')
        }
        if(temp <= 28){
            body.setAttribute('class','warm')
        }
        if(temp <= 25){
            body.setAttribute('class','cool')
        }
        if(temp <= 19){
            body.setAttribute('class','cold')
        }     
    }else{
        content.classList.add('hide')
    }
}
search.addEventListener('change', ()=>{
    let locationSearch= search.value.trim()
    changeWhetherUI(locationSearch)
     
})
changeWhetherUI('Da lat')


const handleVoice =(text)=>{
    const handleText = text.toLowerCase();
    search.value = handleText;
    console.log(search.value);
    const changeEvent= new Event('change');
    search.dispatchEvent(changeEvent);
}
micro.addEventListener('click', (e)=>{

    e.preventDefault();
    recognition.start();
    micro.classList.add('recording')
});

recognition.onspeechend = ()=>{
    recognition.stop();
    micro.classList.remove('recording')

}
recognition.onerror = (err)=>{
    console.log(err);
    micro.classList.remove('recording')

}
recognition.onresult=(e)=>{
    console.log('onresult',e);
    const text = e.results[0][0].transcript
    console.log(text);
    handleVoice(text);
}