//const fetch=require('node-fetch')
console.log('sd')

const weatherForm=document.querySelector('form')
const locatio=document.querySelector('input')
const message=document.querySelector("#m1")
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const loc=locatio.value
    console.log("a")
    const url="/weather?location="+loc
    fetch(url).then((response)=>
{
response.json().then((data)=>{
    if(data)
    {
        message.textContent=(data.error)
    }
    else
        {
            message.textContent=(data.currentTemp)
           
        }
})
})

})

