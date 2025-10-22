let cards_name=document.getElementById('cards-el')
let sum=document.getElementById('total')
let show_user=document.getElementById('result')
let show_amount=document.getElementById('amount')
let isalive=true
let winner=false
let count=0
let money=0
let letter_cards=["J","Q","K","A"]

function cardnew(){
    if (isalive && !(winner)){
        let num=Math.floor(Math.random()*13)+2
        show_user.textContent="do you want to take new card?"
        if (num>10){
            cards_name.textContent+=letter_cards[num-11]
        }else{
            cards_name.textContent+=num+"-"
        }
        count+=num
        sum.textContent='Sum: '+count
    }
    if(count==21){
        winner=true
        money+=200
        show_user.textContent="you got jackpot!"
        show_amount.textContent="Per: "+money+"$"
    }else if (count>21){
        isalive=false
        show_user.textContent="you lose the match!"
    }
}

function newgame(){
    count=0
    isalive=true
    winner=false
    sum.textContent="Sum:0 "
    show_user.textContent=""
    cards_name.textContent="Cards: "

}

