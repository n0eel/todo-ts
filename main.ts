let elForm:HTMLFormElement | null = document.querySelector(".todo-form")
let elInput:HTMLInputElement | null = document.querySelector(".todo-input")
let elList:HTMLUListElement | null = document.querySelector(".todo-list")
let elModalWrapper:HTMLDivElement | null = document.querySelector(".modal-wrapper")
let elModalInner:HTMLDivElement | null = document.querySelector(".modal-inner")


const setState = (key:string, data:any):void => {
    localStorage.setItem(key, JSON.stringify(data))
}

const getState = (key:string):any => {
    let isValid = localStorage.getItem(key)
    if (isValid) {
        return JSON.parse(isValid)
    }
}


interface TodoType {
    index?: number
    title: string
    id: number
}

let todos:Array<TodoType> = getState("todos") || []

elForm?.addEventListener("submit", function(e:Event){
    e.preventDefault()
    const data:TodoType = {
        title: (elInput as HTMLInputElement).value,   
        id: todos.length + 1
    }

    todos.push(data) 
    renderTodos(todos, (elList as HTMLUListElement));
    (elInput as HTMLInputElement).value = ""
    setState("todos", todos)
}) 


function renderTodos(arr:Array<TodoType>, list:HTMLUListElement):void {
    (list as HTMLUListElement).innerHTML = ''
    arr.forEach((item:TodoType, id:number) => {
        let elItem:HTMLLIElement | null = document.createElement("li")
        elItem.className = "flex items-center justify-between bg-slate-300 p-2 rounded-md"
        elItem.innerHTML =
        `<div>
            <span class="text-[18px]">${id+1}.</span>
            <strong class="text-[18px]">${item.title}</strong>
        </div>
        <div class="space-x-2">
            <button onclick="handleDelete(${id})" class="bg-red-500 px-4 py-2 text-white rounded-md" type="button">Delete</button>
            <button onclick="handleEditTodo(${item.id})" class="bg-blue-500 px-4 py-2 text-white rounded-md" type="button">Edit</button>
        </div>`
        list?.appendChild(elItem)
    })
}
renderTodos(todos, (elList as HTMLUListElement))


function handleDelete(id:number) {
    todos.splice(id, 1)
    renderTodos(todos, (elList as HTMLUListElement))
    setState("todos", todos)
}

function handleEditTodo(id:number) {
    const findTodo = todos.find(item => item.id == id)
    console.log(findTodo);
    (elModalWrapper as HTMLDivElement).classList.remove("scale-0");
    (elModalInner as HTMLDivElement).innerHTML = `
               <form class="editTodoForm" autocomplete="off">
            <h1 class="text-center text-[20px] font-bold">Edit Todo</h1>
            <div class="mt-2">
                <span>1.</span>
                <input class="p-2 outline-none focus:border-[1px] focus:border-blue-500 rounded-md placeholder-black" type="text" placeholder="${findTodo?.title}" value="${findTodo?.title}">
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md right-7 absolute">Save</button>
          </form>
          `
    let elEditTodoForm = document.querySelector(".editTodoForm");


    elEditTodoForm?.addEventListener("submit", function(e:Event){
        e.preventDefault()
        // findTodo?.title = e.target.title.value

        (elModalWrapper as HTMLDivElement).classList.add("scale-1");
        setState("todos", todos)

    })
}