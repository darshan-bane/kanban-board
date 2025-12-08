const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const allColumns = [todo, progress, done]
const taskData = {}

let dragElement = null
const tasks = document.querySelectorAll('.task')
tasks.forEach((task) => {
    task.addEventListener('drag', (e) => {
        dragElement = task
    })
})

function addTask(title, desc, column) {
    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = `
         <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `
    column.appendChild(div)

    div.addEventListener('drag', (e) => {
        dragElement = div
    })

    const deleteBtn = div.querySelector('button')
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault()
        div.remove();
        updateTaskCount()
    })

    return div;
}

function updateTaskCount() {
    allColumns.forEach((col) => {
        const tasks = col.querySelectorAll('.task')
        const count = col.querySelector('.count')

        taskData[col.id] = Array.from(tasks)?.map((t) => {
            return {
                title: t.querySelector('h2').innerText,
                desc: t.querySelector('p').innerText,
            }
        })

        localStorage.setItem('taskData', JSON.stringify(taskData))
        count.innerHTML = tasks?.length
    })
}

if (localStorage.getItem('taskData')) {
    const data = JSON.parse(localStorage.getItem('taskData'))

    for (const col in data) {
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            addTask(task.title, task.desc, column)
        })
    }
    updateTaskCount()
}


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

        updateTaskCount()
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

    addTask(taskTitle, taskDesc, todo)
    updateTaskCount()

    document.querySelector('#task-title').value = ''
    document.querySelector('#task-desc').value = ''


    modal.classList.remove('active')
})