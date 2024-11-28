"use strict";
let elForm = document.querySelector(".todo-form");
let elInput = document.querySelector(".todo-input");
let elList = document.querySelector(".todo-list");
let elModalWrapper = document.querySelector(".modal-wrapper");
let elModalInner = document.querySelector(".modal-inner");
const setState = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
const getState = (key) => {
    let isValid = localStorage.getItem(key);
    if (isValid) {
        return JSON.parse(isValid);
    }
};
let todos = getState("todos") || [];
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        title: elInput.value,
        id: todos.length + 1
    };
    todos.push(data);
    renderTodos(todos, elList);
    elInput.value = "";
    setState("todos", todos);
});
function renderTodos(arr, list) {
    list.innerHTML = '';
    arr.forEach((item, id) => {
        let elItem = document.createElement("li");
        elItem.className = "flex items-center justify-between bg-slate-300 p-2 rounded-md";
        elItem.innerHTML =
            `<div>
            <span class="text-[18px]">${id + 1}.</span>
            <strong class="text-[18px]">${item.title}</strong>
        </div>
        <div class="space-x-2">
            <button onclick="handleDelete(${id})" class="bg-red-500 px-4 py-2 text-white rounded-md" type="button">Delete</button>
            <button onclick="handleEditTodo(${item.id})" class="bg-blue-500 px-4 py-2 text-white rounded-md" type="button">Edit</button>
        </div>`;
        list === null || list === void 0 ? void 0 : list.appendChild(elItem);
    });
}
renderTodos(todos, elList);
function handleDelete(id) {
    todos.splice(id, 1);
    renderTodos(todos, elList);
    setState("todos", todos);
}
function handleEditTodo(id) {
    const findTodo = todos.find(item => item.id == id);
    console.log(findTodo);
    elModalWrapper.classList.remove("scale-0");
    elModalInner.innerHTML = `
               <form class="editTodoForm" autocomplete="off">
            <h1 class="text-center text-[20px] font-bold">Edit Todo</h1>
            <div class="mt-2">
                <span>1.</span>
                <input class="p-2 outline-none focus:border-[1px] focus:border-blue-500 rounded-md placeholder-black" type="text" placeholder="${findTodo === null || findTodo === void 0 ? void 0 : findTodo.title}" value="${findTodo === null || findTodo === void 0 ? void 0 : findTodo.title}">
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md right-7 absolute">Save</button>
          </form>
          `;
    let elEditTodoForm = document.querySelector(".editTodoForm");
    elEditTodoForm === null || elEditTodoForm === void 0 ? void 0 : elEditTodoForm.addEventListener("submit", function (e) {
        e.preventDefault()(elModalWrapper).classList.add("scale-1");
        setState("todos", todos);
    });
}
