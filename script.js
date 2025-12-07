const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const allColumns = [todo, progress, done]

let dragElement = null
const tasks = document.querySelectorAll('.task')
tasks.forEach((task) => {
    task.addEventListener('drag', (e) => {
        dragElement = task
    })
})


const addDragEventOnColumn = (column) => {
    //entering
    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('hover-over')
    })
    //leaving
    column.addEventListener('dragleave', (e) => {
        e.preventDefault();
        column.classList.remove('hover-over')
    })

    //onhover
    column.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    //drop
    column.addEventListener('drop', (e) => {
        e.preventDefault()
        column.appendChild(dragElement)
        column.classList.remove('hover-over')

        allColumns.forEach((col) => {
            const tasks = col.querySelectorAll('.task')
            const count = col.querySelector('.count')

            count.innerText = tasks.length
        })
    })

}
addDragEventOnColumn(todo)
addDragEventOnColumn(progress)
addDragEventOnColumn(done)


// ===== modal code ======

const toogleBtn = document.querySelector('#toogle-modal')
const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
const addTaskBtn = document.querySelector('#add-task-btn')


toogleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.toggle('active')
})
backdrop.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('active')
})

addTaskBtn.addEventListener('click', (e) => {
    const taskTitle = document.querySelector('#task-title').value
    const taskDesc = document.querySelector('#task-desc').value

    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = `
         <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button class="delete-btn">Delete</button>
    `
    todo.appendChild(div)

    allColumns.forEach((col) => {
        const tasks = col.querySelectorAll('.task')
        const count = col.querySelector('.count')

        count.innerHTML = tasks?.length
    })

    div.addEventListener('drag', (e) => {
        dragElement = div
    })
    modal.classList.remove('active')
})