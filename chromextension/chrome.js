let myleads=[]
const inputEl=document.getElementById('input-el')
const input_button=document.getElementById('input-btn')
const ulEl=document.getElementById('ul-l')
const delbtn=document.getElementById('delete-btn')
const resetbtn=document.getElementById('reset-btn')
const savebtn=document.getElementById('save-btn')

let leadlocalstorage=JSON.parse(localStorage.getItem('myleads'))




if (leadlocalstorage){
    myleads=leadlocalstorage
    renderleads(myleads)
}

savebtn.addEventListener('click',function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem('myleads',JSON.stringify(myleads))
        renderleads(myleads)
        console.log('success')
    })

})

resetbtn.addEventListener('click',function(){
    localStorage.clear()
    myleads=[]
    renderleads(myleads)
})

delbtn.addEventListener('click',function(){
    myleads.pop()
    localStorage.setItem('myleads',JSON.stringify(myleads))
    console.log(myleads)
    renderleads(myleads)
})


input_button.addEventListener('click',function(){
    if(inputEl.value){
        myleads.push(inputEl.value)
        inputEl.value=""
        localStorage.setItem('myleads',JSON.stringify(myleads))
        renderleads(myleads)
    }
})

function renderleads(leads){
    let listitems=''
    for (let i=0;i<leads.length;i++){
        listitems+=`<li>
                        <a href=${leads[i]} target="blank">${leads[i]}</a>
                    </li>`
    }

    ulEl.innerHTML=listitems
}


