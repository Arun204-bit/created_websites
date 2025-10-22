let userbtn=document.getElementById('display-btn')
let convertbtn=document.getElementById('convert-btn')
let lengthshow=document.getElementById('length-btn')
let volumeshow=document.getElementById('volume-btn')
let massshow=document.getElementById('mass-btn')
let user_value=0

convertbtn.addEventListener('click',function(){
    user_value=Number(userbtn.value)
    console.log(user_value)
    lengthshow.textContent=`${user_value}m = ${(user_value*3.28084).toFixed(3)}feet | ${user_value}feet = ${(user_value*0.3048).toFixed(3)}m`
    volumeshow.textContent=`${user_value}liter = ${(user_value*0.264172).toFixed(3)}gallon | ${user_value}gallon = ${(user_value*3.78541).toFixed(3)}liter`
    massshow.textContent=`${user_value}kilos = ${(user_value*2.20462).toFixed(3)}pound | ${user_value}pound = ${(user_value*0.453592).toFixed(3)}kilos`

})
