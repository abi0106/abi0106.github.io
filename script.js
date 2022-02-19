//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterTodo=document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded',getLocalTodos)
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteCheck)
filterTodo.addEventListener('change',filterTodos)
//functions
function addTodo(event)
{
    event.preventDefault();
    //div element
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    // todo li
    const newTodo=document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText=todoInput.value
    todoDiv.appendChild(newTodo);
    //SAVE TODO ON LOACALSTORAGE
    saveLocalTodos(todoInput.value);
    //check mark button
    const completedButton=document.createElement('button');
    completedButton.classList.add('complete-btn');
    // completedButton.innerHTML='<i class="fa-solid fa-square-check"></i>';
    completedButton.innerHTML='<i class="fa-solid fa-check"></i>';
    todoDiv.appendChild(completedButton);
    //ctrash mark button
    const trashButton=document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML='<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //aAPPEND TO LIST
    todoList.appendChild(todoDiv)
    
    //CLEAR INPUT VALUE
    todoInput.value=null;

}

function deleteCheck(e)
{
    const item=e.target;
    // delete the todo
    if(item.classList[0] === 'trash-btn')
    {
        let todo=item.parentElement;
        todo.classList.add('fall');
        removeLocalItem(todo)
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
        // todo.remove();
    }

    if(item.classList[0] === 'complete-btn')
    {
        let todo=item.parentElement;
        todo.classList.add('completed');
    }
}

function filterTodos(e)
{
    console.log(e)
    const todos=todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(filterTodo.value)
        {
            case 'all':
                todo.style.display='flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed'))
                {
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display='flex';
                }else{
                    todo.style.display='none'
                }
                break;
        }
    })
}

function saveLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getLocalTodos()
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo)
    {
        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        // todo li
        const newTodo=document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText=todo
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton=document.createElement('button');
        completedButton.classList.add('complete-btn');
        // completedButton.innerHTML='<i class="fa-solid fa-square-check"></i>';
        completedButton.innerHTML='<i class="fa-solid fa-check"></i>';
        todoDiv.appendChild(completedButton);
        //ctrash mark button
        const trashButton=document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML='<i class="fa-solid fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        //aAPPEND TO LIST
        todoList.appendChild(todoDiv)
    })
}

function removeLocalItem(todo)
{
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    let todoIndex=todo.children[0].innerText
    todos.splice(todos.indexOf(todo),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}