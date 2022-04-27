import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const keepService = {
    query,
    getById,
    addKeep,
    removeKeep,

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
            keep = { id, type: 'keep-txt', info: { txt: input } }
            break
        case 'keep-img':
            keep = { id, type: 'keep-img', info: { url: input } }
            break
        case 'keep-todos':
            keep = { id, type: 'keep-todos', info: [input.split(',')] }
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
                txt: "Keep no. 1"
            }
        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://lirp.cdn-website.com/7ece8951/dms3rep/multi/opt/GettyImages-544673512-960w.jpg",
                title: ""
            }
        },
        {
            id: utilService.makeId(),
            type: "keep-txt",
            info: {
                txt: "Keep no. 3"
            }
        }
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