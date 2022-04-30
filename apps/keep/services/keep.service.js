import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const keepService = {
    query,
    getById,
    addKeep,
    removeKeep,
    removeTodo,
    toggleTodo,
    addTodo,
    changeColor,
    updateKeep,
    duplicateKeep,
    pinKeep,

}

const KEY = 'keepDB'

function query() {
    let keeps = _loadFromStorage()
    if (!keeps) {
        keeps = _createData()
        _saveToStorage(keeps)
    }

    return Promise.resolve(keeps)
}

function getById(keepId) {
    const keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    return Promise.resolve(keep)
}

function addKeep(input, type) {
    const id = utilService.makeId()
    let keep = {}
    switch (type) {
        case 'keep-txt':
            keep = { id, type: 'keep-txt', info: { txt: input }, isPinned: false }
            break
        case 'keep-img':
            keep = { id, type: 'keep-img', info: { url: input }, isPinned: false }
            break
        case 'keep-todos':
            keep = { id, type: 'keep-todos', info: { label: '', todos: _createTodos(input) }, isPinned: false }
            break
        case 'keep-video':
            keep = { id, type: 'keep-video', url: _getYouTubeLink(input), isPinned: false }
            break
    }

    let keeps = _loadFromStorage()
    keeps.unshift(keep)
    _saveToStorage(keeps)
    return Promise.resolve(keeps)

}

function removeKeep(keepId) {
    let keeps = _loadFromStorage()
    const idx = keeps.findIndex(keep => keep.id === keepId)
    keeps.splice(idx, 1)
    _saveToStorage(keeps)
    return Promise.resolve(keeps)

}

function removeTodo(keepId, todoId) {
    let keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    const todoIdx = keep.info.todos.findIndex(todo => todoId === todo.id)
    keep.info.todos.splice(todoIdx, 1)
    keeps.splice(keepIdx, 1, keep)
    _saveToStorage(keeps)
    return Promise.resolve(keep.info.todos)

}

function toggleTodo(keepId, todoId) {
    let keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    const todoIdx = keep.info.todos.findIndex(todo => todoId === todo.id)
    keep.info.todos[todoIdx].isDone = !keep.info.todos[todoIdx].isDone
    keeps.splice(keepIdx, 1, keep)
    _saveToStorage(keeps)
    return Promise.resolve(keep.info.todos)

}

function addTodo(keepId, input) {
    let keeps = _loadFromStorage()
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    const newTodo = {
        id: utilService.makeId(),
        txt: input,
        isDone: false
    }
    keeps[keepIdx].info.todos.push(newTodo)
    _saveToStorage(keeps)
    return Promise.resolve(keeps[keepIdx].info.todos)


}

function changeColor(keepId, color) {
    let keeps = _loadFromStorage()
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    keeps[keepIdx].color = color
    _saveToStorage(keeps)
    return Promise.resolve(keeps)
}

function updateKeep(val, keepId, todoId) {
    let keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    if (todoId) {
        const todoIdx = keep.info.todos.findIndex(todo => todoId === todo.id)
        keep.info.todos[todoIdx].txt = val
    }
    else { keep.info.txt = val }
    keeps.splice(keepIdx, 1, keep)
    _saveToStorage(keeps)
    return Promise.resolve(keeps)

}

function duplicateKeep(keepId) {
    let keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)

    const copyKeep = { ...keep, id: utilService.makeId() }
    keeps.splice(keepIdx, 0, copyKeep)
    _saveToStorage(keeps)
    return Promise.resolve(keeps)

}

function pinKeep(keepId) {
    let keeps = _loadFromStorage()
    const keepIdx = keeps.findIndex(keep => keepId === keep.id)
    keeps[keepIdx].isPinned = !keeps[keepIdx].isPinned
    _saveToStorage(keeps)
    return Promise.resolve(keeps)
}

function _getYouTubeLink(input) {
    return input.replace('watch?v=', 'embed/')
}

function _createTodos(input) {
    let todos = input.split(',')
    return todos.map(todo => ({ id: utilService.makeId(), txt: todo, isDone: false }))

}

function _saveToStorage(keeps) {
    storageService.saveToStorage(KEY, keeps)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _createData() {
    return [
        {
            id: utilService.makeId(),
            type: "keep-txt",
            info: {
                txt: "Hello World! Let's try this awesome app!"
            },
            isPinned: true,
            color: "#59adf6"
        },
        {
            id: utilService.makeId(),
            type: "keep-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Finish coding", isDone: false },
                    { txt: "Get satisfied with the process", isDone: true },
                    { txt: "Get exahusted", isDone: true },
                ]
            },
            isPinned: true,
            color: "#42d6a4"

        },
        {
            id: utilService.makeId(),
            type: "keep-video",
            url: _getYouTubeLink('https://www.youtube.com/watch?v=4IyYugLeDjg'),
            isPinned: false,
            color: "#c780e8"
        },
        {
            id: utilService.makeId(),
            type: "keep-video",
            url: _getYouTubeLink('https://www.youtube.com/watch?v=429vxpfe2Ag'),
            isPinned: false,
            color: "#ff6961"
        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://lirp.cdn-website.com/7ece8951/dms3rep/multi/opt/GettyImages-544673512-960w.jpg",
                title: ""
            },
            isPinned: false,
            color: "#08cad1"
        },
        {
            id: utilService.makeId(),
            type: "keep-txt",
            info: {
                txt: "React is awesome!"
            },
            isPinned: false,
            color: "#f8f38d"
        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://images.ctfassets.net/hrltx12pl8hq/qGOnNvgfJIe2MytFdIcTQ/429dd7e2cb176f93bf9b21a8f89edc77/Images.jpg",
                title: ""
            },
            isPinned: true,
            color: "#ff6961"
        },
        {
            id: utilService.makeId(),
            type: "keep-txt",
            info: {
                txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            isPinned: true,
            color: "#9d94ff"
        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://images.theconversation.com/files/304963/original/file-20191203-66982-1rzdvz4.jpg?ixlib=rb-1.1.0&rect=31%2C71%2C5330%2C2665&q=45&auto=format&w=1356&h=668&fit=crop",
                title: ""
            },
            isPinned: false,
            color: "#42d6a4"
        },
        {
            id: utilService.makeId(),
            type: "keep-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Tomatoes", isDone: false },
                    { txt: "Cucumbers", isDone: false },
                    { txt: "Carrots", isDone: false },
                    { txt: "Onions", isDone: false },
                    { txt: "Apples", isDone: false },
                    { txt: "Grapes", isDone: false },
                    { txt: "Bananas", isDone: false },
                    { txt: "Peaches", isDone: false },
                    { txt: "Strawberries", isDone: false },
                ]
            },
            isPinned: false,
            color: "#ffb480"

        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://bradaronson.com/wp-content/uploads/2013/10/happy.jpg",
                title: ""
            },
            isPinned: false,
            color: "#08cad1"
        },
        {
            id: utilService.makeId(),
            type: "keep-video",
            url: _getYouTubeLink('https://www.youtube.com/watch?v=_hQxy7KKq3U'),
            isPinned: true,
            color: "#f8f38d"
        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://i.pinimg.com/736x/11/af/44/11af44d69ce6d325d042f8a83adc50af--bestfriends-bffs.jpg",
                title: ""
            },
            isPinned: false,
            color: "#9d94ff"
        },
        {
            id: utilService.makeId(),
            type: "keep-txt",
            info: {
                txt: "This is some random text"
            },
            isPinned: false, color: "#c780e8"
        },
    ]
}

// function _createData() {
//     return [
//         {
//             id: utilService.makeId(),
//             type: "keep-txt",
//             isPinned: true,
//             info: {
//                 txt: "Fullstack Me Baby!"
//             }
//         },
//         {
//             id: utilService.makeId(),
//             type: "keep-img",
//             info: {
//                 url: "https://lirp.cdn-website.com/7ece8951/dms3rep/multi/opt/GettyImages-544673512-960w.jpg",
//                 title: "Bobi and Me"
//             },
//             style: {
//                 backgroundColor: "#00d"
//             }
//         },
//         {
//             id: utilService.makeId(),
//             type: "keep-todos",
//             info: {
//                 label: "Get my stuff together",
//                 todos: [
//                     { txt: "Driving liscence", doneAt: null },
//                     { txt: "Coding power", doneAt: 187111111 }
//                 ]
//             }
//         }
//     ]
// }