/*
<div id="homedetails">
    <h1 id="homehead">folder is empty</h1>
    <img src="folder.png" id="icon-img">
</div>*/


/*<button class="folder">folder1</button>
<button class="folder">folder2</button>
<button class="folder">folder3</button>
*/






let folder_stack=[]

const home_ele=document.createElement("div")
home_ele.id="homedetails"
home_ele.innerHTML= `<h1 id="homehead">folder is empty</h1> <img src="folder.png" id="icon-img"></img>`

const savetab_btn=document.createElement("button")
savetab_btn.classList.add("last_btn")
savetab_btn.id="save_btn"
savetab_btn.textContent="save_btn"


class file{
    files={}
    tabs=[]
    
    
    constructor(name,element){
        this.name=name
        this.element=element
        this.inner_div=document.createElement("div")
        this.inner_list=document.createElement("ul")
        this.inner_div.classList.add("inside_folder")
        this.inner_div.innerHTML=`<button class="back_btn"></button>`
        this.inner_div.appendChild(this.inner_list)
    }
    add_file(fitem){
        this.files[fitem.name]=fitem
    }
    add_tab(tab){
        this.tabs.push(tab)
    }
    del_tab(){
        this.tabs.pop()
    }
    add_element(){
        let domain=window.location.href
        let link_list=document.createElement("li")
        this.add_tab(domain)
        link_list.innerHTML=`<a href="${domain}">${domain}</a>`
        this.inner_list.appendChild(link_list)
    }





}

const create_btn=document.getElementById("create_btn")
const delete_btn=document.getElementById("delete_btn")
const user_screen=document.getElementById("user_screen")
const btns=document.getElementById("btns")
const home_detail=document.getElementById("homedetails")
let empty_folders=true
let count=0
let rev_count=0
let last_checked=[]
let out_folder=true
let curr_folder=""


create_btn.addEventListener("click",()=>{
    if(out_folder){
        home_ele.remove()
        home_detail.remove() 
        show_user(create_folder())
        empty_folders=false
        console.log(folder_stack)
    }



})

delete_btn.addEventListener("click",()=>{
    if(out_folder){
        if(folder_stack.length>1){
            const last_folder=folder_stack.pop()
            console.log(folder_stack.length)
            console.log(last_folder.name)
            last_folder.element.remove()
        }else if(folder_stack.length==1){
            const last_folder=folder_stack.pop()
            last_folder.element.remove()
            empty_folder=true
            show_user(home_ele)
        }
        count--
    }else{
        folder_stack.forEach(fol=>{
            if(fol.name==curr_folder){
                if(fol.inner_list.lastElementChild){
                    fol.inner_list.lastElementChild.remove()
                }
            }
        })
    }

})


const show_user=(item,go_outside=false)=>{
    console.log(go_outside,empty_folders)
    if(!go_outside ){
        if(empty_folders || !out_folder){
            user_screen.innerHTML=""
            user_screen.appendChild(btns)
            user_screen.prepend(item)
        }else{
            user_screen.prepend(item)
        }
    }
    else{
        user_screen.innerHTML=""
        user_screen.appendChild(btns)
        item.forEach(folder => {
            user_screen.prepend(folder.element)
        });
    }

}

const create_folder=()=>{
    const new_btn=document.createElement("button")
    new_btn.classList.add("folder")
    new_btn.id=`folder${count}`
    new_btn.textContent=`folder${count}`
    const folder=new file(`folder${count}`,new_btn)
    folder_stack.push(folder)
    count+=1
    return folder.element
}

const show_tabs=(link)=>{
    const table_list=document.createElement("li")
    table_list.textContent=link
}

user_screen.addEventListener("click",(e)=>{
    if(e.target.classList.contains("folder")){
        console.log(e.target.id)
        folder_stack.forEach(fol => {
            if(fol.name==e.target.id){
                curr_folder=`${fol.name}`
                out_folder=false
                delete_btn.parentNode.insertBefore(savetab_btn,delete_btn)
                show_user(fol.inner_div)

            }
        })
    }
    else if(e.target.classList.contains("back_btn")){
        out_folder=true
        save_btn.remove()
        show_user(folder_stack,true)
    }
})

/*
user_screen.innerHTML=""
user_screen.appendChild(btns)
*/
savetab_btn.addEventListener("click",()=>{
    folder_stack.forEach(fol=>{
        if(fol.name==curr_folder){
            fol.add_element()
            console.log(fol.tabs)
        }
    })
})


