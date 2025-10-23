function getstackdata(){
    return {
        name:'qtechai',
        sym:'qta',
        price:Math.round(Math.random()*3*100)/100,
        time:new Date().toLocaleTimeString()
    }
}
console.log(getstackdata())



function renderstockticker(stockdata){
    const stockdisplayname=document.getElementById('name')
    const stockdisplaysymbol=document.getElementById('sym')
    const stockdisplayprice=document.getElementById('price')
    const stockdisplaypriceicon=document.getElementById('icon')
    const stockdisplaytime=document.getElementById('time')
    let upgrade=null

    setInterval(function(){
        let newstockdata=stockdata
        const {name,sym,price,time}=newstockdata()
        stockdisplayname.textContent=`Name : ${name}`
        stockdisplaysymbol.textContent=`Symbol : ${sym}`
        stockdisplayprice.textContent=`Price : ${price}`
        stockdisplaytime.textContent=`Time : ${time}`
        stockdisplaypriceicon.textContent=upgrade<price?`😎`:upgrade>price?'😱':'😇'
        upgrade=price
    },1500)

}
renderstockticker(getstackdata)

