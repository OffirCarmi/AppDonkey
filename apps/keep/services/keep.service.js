import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const keepService = {
    query,
    getById,

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

// function addKeep (keep){

// }

function getById(keepId) {
    const keeps = _loadFromStorage()
    const keep = keeps.find(keep => keepId === keep.id)
    return Promise.resolve(keep)
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
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "keep-img",
            info: {
                url: "https://lirp.cdn-website.com/7ece8951/dms3rep/multi/opt/GettyImages-544673512-960w.jpg",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "keep-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ]
}