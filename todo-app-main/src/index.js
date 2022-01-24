const body = document.querySelector('body')
const content = document.querySelector('main')
const lista = document.getElementById('lista')
const titleCategoriesTodos = document.querySelector('#titleCategoriesTodos')

let allTodos = []
let checkedTodos = []

//Botones
const BTNChangeTheme = document.querySelector('#btnChangeTheme')
const BTNallTodos = document.querySelector('#allTodos')
const BTNactiveTodos = document.querySelector('#activeTodos')
const BTNcompletedTodos = document.querySelector('#completedTodos')
const BTNclearCompletedTodos = document.querySelector('#clearCompletedTodos')

BTNChangeTheme.textContent= getTheme() == 'dark' ? '🌞' : '🌚'

BTNallTodos.onclick= () => {
    console.log(allTodos);
    cleanListTodos()
    showListTodos(allTodos)
    updateTodosCategorieTitle('All')
}

BTNactiveTodos.onclick= () => {
    const activeTodos = allTodos.filter(todo => !todo.children[0].checked)
    console.log(activeTodos);
    cleanListTodos()
    showListTodos(activeTodos)
    updateTodosCategorieTitle('Active')
}

BTNcompletedTodos.onclick= () => {
    console.log(checkedTodos);
    cleanListTodos()
    showListTodos(checkedTodos)
    updateTodosCategorieTitle('Completed')
}

BTNclearCompletedTodos.onclick= () => {
    clearCompletedTodos();
}


BTNChangeTheme.onclick = () => {
    getTheme() == 'dark' ? changeTheme('light') : changeTheme('dark')
    BTNChangeTheme.textContent= getTheme() == 'dark' ? '🌞' : '🌚'
};

function changeTheme(theme){
    const previousClassBody = body.className
    
    body.classList.remove(previousClassBody)
    content.classList.remove(previousClassBody)

    body.classList.add(theme)
    content.classList.add(theme)
}

const newTodo = document.querySelector('.todoEntry input[type=text]')

newTodo.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        console.log("creando nueva tarea")
        todo = newTodo.value
        createNewTodo(todo)
        newTodo.value= ''
        recordDeleteBTN();
        recordCheckBTN();
    }
})


//libreria SORTABLE JS para el drag & drop
Sortable.create(lista, {
    chosenClass: 'selected',
    // ghostClass: 'ghost',
    dragClass: 'drag',
    animation: '150'
})

function createNewTodo(todo) {
    if(todo.length==0){
        return alert("You can't save this, you must write something!")
    } 

    const element = document.createElement('li')
    
    const checkbox = document.createElement('input')
    checkbox.setAttribute("type", "checkbox");
    
    const todoTitle = document.createElement('h3')
    todoTitle.textContent= todo

    const btnDelete = document.createElement('button')
    btnDelete.textContent= 'X'

    element.appendChild(checkbox)
    element.appendChild(todoTitle)
    element.appendChild(btnDelete)

    allTodos.unshift(element)
    console.log(allTodos);
    const firstElement= lista.firstChild;
    updateTodoLefts();
    
    return lista.insertBefore(element, firstElement);
}


function recordDeleteBTN() {
    const BTNdeleteTodo = document.querySelectorAll('ul li button')

    BTNdeleteTodo.forEach((btn, i) => {
        btn.onclick= () => {
            console.log("eliminando tarea");
            const todoElement = btn.parentElement
            deleteTodo(todoElement)
        }
    })
}

function recordCheckBTN() {
    const BTNcheckTodo = document.querySelectorAll('ul li input[type=checkbox]')
    console.log(BTNcheckTodo);

    BTNcheckTodo.forEach((check, i) => {
        check.onclick= () => {
            console.log("marcando tarea completa");
            const todoElement = check.parentNode
            const checkStatus= check.checked
            checkTodo(todoElement, checkStatus)
        }
    })
}


function deleteTodo(todoElement) {
    const indexTodo = allTodos.indexOf(todoElement)
    allTodos.splice(indexTodo, 1) //elimino del array principal de todos   
    checkTodo(todoElement, false) // elimino del array de los todos checkeados o completados
    updateTodoLefts()
    lista.removeChild(todoElement) //elimino el LI de la lista html(UL)
}

function checkTodo(todoElement, check) {
    const titleTodo = todoElement.children[1] //es el titleTodo
    check ? titleTodo.classList.add('checked') : titleTodo.classList.remove('checked');

    //Agrego o elimino una tarea completada de su array dependiendo del check true o false
    if(check){
        checkedTodos.push(todoElement)
    } else {
        const indexTodo = checkedTodos.indexOf(todoElement)
        checkedTodos.splice(indexTodo, 1)
    }

    updateTodoLefts()
}

//MAL HECHO
function cleanListTodos() {
    lista.childNodes.forEach((li) => {
        setTimeout(() => {
            lista.removeChild(li)
        }, 100);    
    })
}

function showListTodos(listTodos){
    listTodos.forEach((li) => {
        setTimeout(() => {
            lista.appendChild(li)
        }, 100);
    })
}

function updateTodoLefts(){
    const todosLeftsQuantity = allTodos.filter(todo => !todo.children[0].checked).length //filtro los todos no checkeados
    const todosLefts = document.querySelector('#todosLefts');

    todosLefts.textContent = `${todosLeftsQuantity} items left`
}

function getTheme() {
    const theme = body.classList[0]
    console.log(theme);
    return theme
}

function clearCompletedTodos() {
    checkedTodos.forEach((todo) => {
        setTimeout(() => {
            deleteTodo(todo);
        }, 100);
    })
}

function updateTodosCategorieTitle(title) {
    titleCategoriesTodos.textContent = title
}

