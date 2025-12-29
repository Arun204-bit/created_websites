/*
<div id="homedetails">
    <h1 id="homehead">folder is empty</h1>
    <img src="folder.png" id="icon-img">
</div>*/


/*<button class="folder">folder1</button>
<button class="folder">folder2</button>
<button class="folder">folder3</button>
*/






let folder_stack=[] //using folders as stack (for now)

if(!localStorage.getItem("folder_stack")){ //create an empty folder_stack in LS
    localStorage.setItem("folder_stack",JSON.stringify([]))
}

if(!localStorage.getItem("empty_folders")){
    localStorage.setItem("empty_folders",JSON.stringify(true))
}

if(!localStorage.getItem("count")){ 
    localStorage.setItem("count",0)
}
const home_ele=document.createElement("div")
home_ele.id="homedetails"
home_ele.innerHTML= `<h1 id="homehead">folder is empty</h1> <img src="folder.png" id="icon-img"></img>`

const savetab_btn=document.createElement("button")
savetab_btn.classList.add("last_btn")
savetab_btn.id="save_btn"
savetab_btn.textContent="save_btn"


class file{
    files={} //for files inside another file
    tabs=[] //for links or tabs to save in certain file
    
    
    constructor(name,element){
        this.name=name //folder name
        this.element=element //button as an element
        this.inner_div=document.createElement("div")
        this.inner_list=document.createElement("ul") //to show links as list
        this.inner_div.classList.add("inside_folder")
        this.inner_div.innerHTML=`<button class="back_btn"></button>`
        this.inner_div.appendChild(this.inner_list)
    }
    add_file(fitem){ //fitem is also a class of file
        this.files[fitem.name]=fitem
    }
    add_tab(tab){ 
        this.tabs.push(tab)
    }
    del_tab(){
        this.tabs.pop()
    }
    add_element(link=null){ //to get the link of current web page
        let domain=window.location.origin
        if(link){
            domain=link
        }
        let link_list=document.createElement("li")
        this.add_tab(domain)
        link_list.innerHTML=`<a href="${domain}" target="_blank">${domain}</a>`
        this.inner_list.appendChild(link_list)
        return domain
    }





}

const create_btn=document.getElementById("create_btn")
const delete_btn=document.getElementById("delete_btn")
const user_screen=document.getElementById("user_screen")
const btns=document.getElementById("btns")
const home_detail=document.getElementById("homedetails")
let empty_folders=JSON.parse(localStorage.getItem("empty_folders"))

let count=JSON.parse(localStorage.getItem("count"))+1 // for seperate files by using name as (folder+count) 
let last_checked=[]
let out_folder=true //for checking the first page of created folder page
let curr_folder="" // to save the current folder we are visiting




const local_list=JSON.parse(localStorage.getItem("folder_stack"))// it is for getting the created folder after we refreshed the page
console.log(local_list)

if(local_list!=0){ //for showing created folder when we refresh the page
    home_detail.remove()
    local_list.forEach(ele => {//recreating created object and list for that  from given LS
        const new_btn=document.createElement("button")
        new_btn.classList.add("folder")
        new_btn.id=ele.name //"ele" are in object format with wanted info
        new_btn.textContent=ele.name
        const folder=new file(ele.name,new_btn)
        //when refreshed needs show saved link by calling the method again
        if(ele.tabs.length!=0){
            ele.tabs.forEach(item => {
                folder.add_element(item)
            });
        }
        folder_stack.push(folder)
        user_screen.prepend(new_btn)
    });
}

create_btn.addEventListener("click",()=>{
    if(out_folder){
        if(empty_folders){
            home_ele.remove()
            home_detail.remove()
            empty_folders=false
            localStorage.setItem("empty_folders",JSON.stringify(empty_folders))
        }
        show_user(create_folder())
        console.log(folder_stack)
    }



})

delete_btn.addEventListener("click",()=>{
    console.log(empty_folders)
    if(out_folder && !empty_folders){ //if visiting current page is the home page (newly created first folders page)
        if(folder_stack.length>1){
            const last_folder=folder_stack.pop()
            console.log(folder_stack.length)
            console.log(last_folder.name)
            last_folder.element.remove()
        }else if(folder_stack.length==1){
            const last_folder=folder_stack.pop()
            last_folder.element.remove()
            empty_folders=true
            localStorage.setItem("empty_folders",JSON.stringify(empty_folders))
            show_user(home_ele)
        }
        let rev_count=JSON.parse(localStorage.getItem("count"))
        rev_count--
        count--
        localStorage.setItem("count",JSON.stringify(rev_count))
        let list=JSON.parse(localStorage.getItem("folder_stack"))
        list.pop()
        localStorage.setItem("folder_stack",JSON.stringify(list))


    }else{
        folder_stack.forEach(fol=>{
            if(fol.name==curr_folder){
                if(fol.inner_list.lastElementChild){
                    fol.inner_list.lastElementChild.remove() //deleting the saved link inside the folder
                    fol.tabs.pop()
                }
            }
        })
        localStorage.setItem("folder_stack",JSON.stringify(folder_stack))
    }

})


const show_user=(item,go_outside=false)=>{ //take input as button element from create_folder function OR takes folder class div element which contains links and other inner folders
    console.log(go_outside,empty_folders)
    if(!go_outside ){
        if(empty_folders || !out_folder){ 
            user_screen.innerHTML=""
            user_screen.appendChild(btns)
            user_screen.prepend(item) //item=element
        }else{
            user_screen.prepend(item)
        }
    }
    else{ //for showing created folders when click the back button
        user_screen.innerHTML=""
        user_screen.appendChild(btns)
        item.forEach(folder => {
            user_screen.prepend(folder.element)
        });
    }

}

const addtolist=(item,count_num)=>{
    let count=JSON.parse(localStorage.getItem("count"))
    count=count_num
    localStorage.setItem("count",JSON.stringify(count)) //updating the count in local storage:"count"
    let list=JSON.parse(localStorage.getItem("folder_stack"))
    //we cant store classes it LS so storing important things as object and not as file name
    list.push({
        name:item.name,
        tabs:item.tabs,
        files:item.files
    }) 
    localStorage.setItem("folder_stack",JSON.stringify(list)) // updating the created folder class in local storage:"local_storage"
}


const create_folder=()=>{
    const new_btn=document.createElement("button")
    new_btn.classList.add("folder")
    new_btn.id=`folder${count}`
    new_btn.textContent=get_file_name(count)
    console.log(new_btn.textContent)
    const folder=new file(new_btn.textContent,new_btn)
    console.log(folder.element)
    folder_stack.push(folder)
    //addtolist(folder)
    addtolist(folder,count)
    //increse count only if the file name in default setting
    if(new_btn.textContent.substring(0,6)=="folder"){
        count+=1
    }

    return folder.element
}

const show_tabs=(link)=>{
    const table_list=document.createElement("li")
    table_list.textContent=link
}

user_screen.addEventListener("click",(e)=>{
    if(e.target.classList.contains("folder")){
        folder_stack.forEach(fol => {
            if(fol.name==e.target.id){
                console.log(fol.name)
                curr_folder=`${fol.name}`
                out_folder=false //to indicate we are visiting one of  newly created folders
                delete_btn.parentNode.insertBefore(savetab_btn,delete_btn) //to insert save_btn between
                console.log(fol.tabs)
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
            let link=fol.add_element()
            console.log(fol.tabs)
        }
    })
    localStorage.setItem("folder_stack",JSON.stringify(folder_stack))
})

//to get the folder name from the user
const get_file_name=(count)=>{
    const filename=prompt("please enter the name:")
    if (!filename){
        return `folder${count}`
    }
    return filename
}


