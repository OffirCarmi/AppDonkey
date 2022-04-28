import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
    query,
    deleteMail,
    setRead,
    toggleRead,
    getFormattedDate
}

const KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appdonkey.com',
    fullName: 'Spike Spiegel'
}

//backup

// function query(criteria) {
//     let mails = _loadFromStorage()
//     if (!mails) {
//         return _fetchEmails().then((newMails) => {
//             _saveToStorage(newMails)
//             if (typeof (criteria) === 'string') {
//                 return _getById(criteria, newMails)
//             }
//             return newMails
//         })
//     }

//     if (typeof (criteria) === 'string') {
//         return _getById(criteria, mails)
//     }
//     return Promise.resolve(mails)
// }

function query(criteria) {
    let mails = _loadFromStorage()
    if (!mails) {
        return _fetchEmails()
            .then(_saveToStorage)
            .then((mails) => {
                //cannot chain another .then after if statement!!!!
                if (typeof (criteria) === 'string') {
                    return _getById(criteria, mails)
                } else return _filterMail(mails, criteria)
            })
    }

    if (typeof (criteria) === 'string') {
        return _getById(criteria, mails)
    }
    mails = _filterMail(mails, criteria)
    return Promise.resolve(mails)
}

function deleteMail(id) {
    let mails = _loadFromStorage()
    mails = mails.filter((mail) => mail.id !== id)
    _saveToStorage(mails)
    return Promise.resolve()
}

function setRead(id) {
    const mails = _loadFromStorage()
    mails.forEach((mail) => mail.id === id ? mail.isRead = true : mail)

    _saveToStorage(mails)
    return Promise.resolve()
}

function toggleRead(id) {
    const mails = _loadFromStorage()
    mails.forEach((mail) => mail.id === id ? mail.isRead = !mail.isRead : mail)

    _saveToStorage(mails)
    return Promise.resolve()
}


function getFormattedDate(date) {
    const dateObj = new Date(date)
    const month = utilService.getMonthShort(dateObj)
    const day = dateObj.getDay()
    return month + ' ' + day

}


function _getById(mailId, mails) {
    const searchedMail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(searchedMail)
}

function _filterMail(mails, criteria) {
    //TODO basic text search filter here first, then complex in another func
    console.log('filtering');
    if(criteria && criteria.txt.length){
        mails = mails.filter((mail) => {
            // ${senderFullname}
            const fullTxt = `${mail.subject} ${mail.body} ${mail.to} ${mail.from}`.toLowerCase()
            return fullTxt.includes(criteria.txt.toLowerCase())
        })
        return mails
    }
    return mails
}

function _fetchEmails() {
    const mail = [{
        id: utilService.makeId(),
        subject: `Join us`,
        body: `Pro Tools Artist is here, opening the door for a new generation of producers, 
        beatmakers, and artists to access the DAW that musical careers are built on.
        Join our live stream with hosts Gaurav Harrish from Avid and audio engineer Wavy Wayne—alongside 
        ASCAP award-winning songwriter and artist`,
        isRead: false,
        sentAt: Date.now(),
        to: 'user@appdonkey.com',
        from: 'mimime@email.com',
        senderFullname: ''
    },
    {
        id: utilService.makeId(),
        subject: 'All those moments',
        body: `All those moments will be lost in time, like tears in rain.
        I've known adventures,
        seen places you people will never see, I've been Offworld and back… frontiers!
        I've stood on the back deck of a blinker bound for the Plutition Camps with sweat in my eyes watching stars fight on the shoulder of
        Orion... I’ve felt wind in my hair, riding test boats off the black galaxies and seen an attack fleet burn like a match and disappear. 
        I've seen it, felt it`,
        isRead: false,
        sentAt: Date.now(),
        to: 'user@appdonkey.com',
        from: 'mimime@email.com',
        senderFullname: ''
    },
    {
        id: utilService.makeId(),
        subject: 'Cant touch this',
        body: 'Ow yeah, you cant touch this',
        isRead: false,
        sentAt: Date.now(),
        to: 'user@appdonkey.com',
        from: 'mimime@email.com',
        senderFullname: ''
    }]
    return Promise.resolve(mail)
    // axios.get()
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
    return mails
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
