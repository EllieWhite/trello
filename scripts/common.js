// плагин регулирует высоту поля и при переполнении добавляет больше вертикального просто
$(function() {
    $("textarea").autosized({
        width: "100%",
        minHeight: 40,
        resize: "vertical",
        overflow: ""
    });
});

const lists = document.querySelectorAll('.list')

function addTask() {
    const btn = document.querySelector('.add-btn')
    const addBtn = document.querySelector('.buttons__add-btn')
    const textarea = document.querySelector('.textarea')
    const cancelBtn = document.querySelector('.buttons__cancel-btn')
    const form = document.querySelector('.form')
    const workArea = document.querySelectorAll('.boards__item')

    let value

    function closeForm() {
        textarea.value = ''
        value = ''
        form.style.display = 'none'
        btn.style.display = 'block'
    }

    btn.addEventListener("click", () => {
        form.style.display = 'block';
        btn.style.display = 'none';
        addBtn.style.display = 'none'
    });

    document.addEventListener('click', e => {
        const target = e.target
        if (!target.closest('.boards__item')) {
            closeForm()
        }
    })

    textarea.addEventListener('input', e => {
        value = e.target.value
        if (value) {
            addBtn.style.display = 'block'
        } else {
            addBtn.style.display = 'none'
        }
    })

    cancelBtn.addEventListener('click', () => {
        closeForm()
    })

    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div')
        newItem.classList.add('list__item')
        newItem.draggable = true
        newItem.textContent = value
        lists[0].append(newItem)
        closeForm()
        dragNdrop()
    })
}

addTask()

const addBoardBtn = document.querySelector('.add-board')

function addBoard() {

    const boards = document.querySelector('.boards')
    const board = document.createElement('div')
    board.classList.add('boards__item')
    board.innerHTML = `<span contenteditable="true" class="title">Введите название</span><div class="list"></div>`
    boards.append(board)
    changeTitle()
    dragNdrop()
}

addBoardBtn.addEventListener('click', addBoard)

function changeTitle() {
    const titles = document.querySelectorAll('.title')

    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '')
    })
}

changeTitle()

let draggedItem = null

function dragNdrop() {
    const listn = document.querySelectorAll('.list')
    const listItems = document.querySelectorAll('.list__item')
    const lists = document.querySelectorAll('.list')

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i] 
        item.addEventListener('dragstart', () => {
            draggedItem = item
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j]

            list.addEventListener('dragover', e => {
                e.preventDefault()
            })

            list.addEventListener('drop', function(e) {
                list.append(draggedItem)
            })
        }

    }
}

dragNdrop()

function greenReplaceBackground() {
    document.body.style.backgroundImage = 'url(./images/leaves.jpg)';
}

function nightReplaceBackground() {
    document.body.style.backgroundImage = 'url(./images/night.jpg)';
}

function flowerReplaceBackground() {
    document.body.style.backgroundImage = 'url(./images/flower.jpg)';
}

function mountauinsReplaceBackground() {
    document.body.style.backgroundImage = 'url(./images/mountauins.jpeg)';
}

function abstractReplaceBackground() {
    document.body.style.backgroundImage = 'url(./images/abstract.jpg)';
}