const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const allColumns = [todo, progress, done]
const taskData = {}

let dragElement = null

// ========== ADD TASK FUNCTION ==========
function addTask(title, desc, column) {
    const div = document.createElement('div')
    div.classList.add('task')
    div.setAttribute('draggable', 'true')

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
        <button class="edit-btn">Edit</button>
    `

    column.appendChild(div)

    // drag
    div.addEventListener('drag', () => {
        dragElement = div
    })

    // Attach delete + edit buttons
    attachEvents(div)

    return div
}

// ========== ATTACH EVENTS (RE-USABLE AFTER EDIT) ==========
function attachEvents(div) {
    const deleteBtn = div.querySelector('.delete-btn')
    const editBtn = div.querySelector('.edit-btn')

    deleteBtn.addEventListener('click', () => {
        div.remove()
        updateTaskCount()
    })

    editBtn.addEventListener('click', () => enableEdit(div))
}

// ========== EDIT FUNCTIONALITY ==========
function enableEdit(div) {
    const oldTitle = div.querySelector('h2').innerText
    const oldDesc = div.querySelector('p').innerText

    const titleInput = document.createElement('input')
    titleInput.value = oldTitle

    const descInput = document.createElement('textarea')
    descInput.value = oldDesc

    const saveBtn = document.createElement('button')
    saveBtn.innerText = 'Save'
    saveBtn.classList.add('edit-btn')

    const cancelBtn = document.createElement('button')
    cancelBtn.innerText = 'Cancel'
    cancelBtn.classList.add('delete-btn')

    div.innerHTML = ''
    div.appendChild(titleInput)
    div.appendChild(descInput)
    div.appendChild(cancelBtn)
    div.appendChild(saveBtn)

    // SAVE
    saveBtn.addEventListener('click', () => {
        div.innerHTML = `
            <h2>${titleInput.value}</h2>
            <p>${descInput.value}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `
        updateTaskCount()
        attachEvents(div)
    })

    // CANCEL
    cancelBtn.addEventListener('click', () => {
        div.innerHTML = `
            <h2>${oldTitle}</h2>
            <p>${oldDesc}</p>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `
        updateTaskCount()
        attachEvents(div)
    })
}

// ========== UPDATE COUNT + SAVE TO LOCAL STORAGE ==========
function updateTaskCount() {
    allColumns.forEach((col) => {
        const tasks = col.querySelectorAll('.task')
        const count = col.querySelector('.count')

        taskData[col.id] = Array.from(tasks).map((t) => ({
            title: t.querySelector('h2').innerText,
            desc: t.querySelector('p').innerText
        }))

        localStorage.setItem('taskData', JSON.stringify(taskData))
        count.innerText = tasks.length
    })
}

// ========== LOAD SAVED TASKS ==========
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

// ========== DRAG & DROP FUNCTIONALITY ==========
const addDragEventOnColumn = (column) => {
    column.addEventListener('dragenter', (e) => {
        e.preventDefault()
        column.classList.add('hover-over')
    })

    column.addEventListener('dragleave', (e) => {
        e.preventDefault()
        column.classList.remove('hover-over')
    })

    column.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

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

// ========== MODAL FUNCTIONALITY ==========
const toogleBtn = document.querySelector('#toogle-modal')
const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
const addTaskBtn = document.querySelector('#add-task-btn')

toogleBtn.addEventListener('click', (e) => {
    e.preventDefault()
    modal.classList.toggle('active')
})

backdrop.addEventListener('click', () => {
    modal.classList.remove('active')
})

addTaskBtn.addEventListener('click', () => {
    const title = document.querySelector('#task-title').value
    const desc = document.querySelector('#task-desc').value

    if (title === '' || desc === '') {
        alert('Please fill the title and description')
    } else {
        addTask(title, desc, todo)
        updateTaskCount()
    }


    document.querySelector('#task-title').value = ''
    document.querySelector('#task-desc').value = ''

    modal.classList.remove('active')
})
