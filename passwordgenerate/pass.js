let password1=document.getElementById('pass1')
let password2=document.getElementById('pass2')
let generate_password=document.getElementById('generate')

const characters=[
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@',
'[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'
]

function new_password(){
    let password=''
    for (let i=0;i<8;i++){
        let num=Math.floor(Math.random()*characters.length)
        password+=characters[num]
    }
    return password
}

generate_password.addEventListener('click',function(){
    let string1=new_password()
    let string2=new_password()
    password1.textContent=string1
    password2.textContent=string2
})