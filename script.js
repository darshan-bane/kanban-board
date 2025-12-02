const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')

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
    })
    
}
addDragEventOnColumn(todo)
addDragEventOnColumn(progress)
addDragEventOnColumn(done)