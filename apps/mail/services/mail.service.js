import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';
import { dummyMails } from "../services/dummy.service.js";



export const mailService = {
    query,
    deleteMail,
    setRead,
    toggleRead,
    toggleStared,
    addMail,
    createMailFromKeep
}

const KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appdonkey.com',
    fullName: 'Spike Spiegel'
}

function query(criteria) {
    let mails = _loadFromStorage()
    if (!mails) {
        return _fetchEmails()
            .then(_saveToStorage)
            .then((mails) => {
                //cannot chain another .then after if statement!!!!
                if (typeof (criteria) === 'string') {
                    return _getById(criteria, mails)
                } else {
                    const total = mails.length
                    const count = mails.filter((mail) => !mail.isRead && mail.to === loggedinUser.email).length
                    mails = _filterMail(mails, criteria)
                    return { mails, count, total }
                }
            })
    }

    if (typeof (criteria) === 'string') {
        return _getById(criteria, mails)
    }
    const total = mails.length
    const count = mails.filter((mail) => !mail.isRead && mail.to === loggedinUser.email).length
    mails = _filterMail(mails, criteria)
    return Promise.resolve({ mails, count, total })
}

function deleteMail(id) {
    let mails = _loadFromStorage()
    mails = mails.filter((mail) => mail.id !== id)
    _saveToStorage(mails)
    return Promise.resolve()
}

function addMail(felid) {
    const mails = _loadFromStorage()
    const newMail = _createMail(felid)
    mails.push(newMail)
    _saveToStorage(mails)
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

function toggleStared(id) {
    const mails = _loadFromStorage()
    mails.forEach((mail) => mail.id === id ? mail.isStared = !mail.isStared : mail)

    _saveToStorage(mails)
    return Promise.resolve(mails)
}

function _getById(mailId, mails) {
    const searchedMail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(searchedMail)
}

function _filterMail(mails, criteria) {
    if (criteria || criteria.txt.length) {
        mails = mails.filter((mail) => {
            // ${senderFullname}
            const fullTxt = `${Object.values(mail).join(' ')}`.toLowerCase()
            return fullTxt.includes(criteria.txt.toLowerCase())
        })
        mails = _filterMailbox(mails, criteria)
    }
    return mails
}

function _filterMailbox(mails, criteria) {
    switch (criteria.mailbox) {
        case 'inbox':
            mails = mails.filter((mail) => mail.to === loggedinUser.email || mail.isStared)
            break
        case 'read':
            mails = mails.filter((mail) => mail.isRead && mail.to === loggedinUser.email)
            break;
        case 'unread':
            mails = mails.filter((mail) => !mail.isRead && mail.to === loggedinUser.email)
            break;
        case 'sentMail':
            mails = mails.filter((mail) => mail.to !== loggedinUser.email && mail.isStared)
            break;
        case 'stared':
            mails = mails.filter((mail) => mail.isStared)
            break;
        default:
            break;
    }
    return mails
}

function createMailFromKeep(txt) {
    return _createMail({ subject: 'Hello from Keep', body: txt, from: loggedinUser.email, senderFullname: loggedinUser.fullName })
}

function _createMail({ subject, body, to, from, senderFullname, date }) {
    if (!senderFullname) senderFullname = loggedinUser.fullName
    if (!from) from = loggedinUser.email
    if (!to) to = ''
    if (!date) date = Date.now()
    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: true,
        sentAt: Date.now(),
        to,
        from,
        senderFullname
    }
}

function _fetchEmails() {
    const mail = dummyMails
    return Promise.resolve(mail)
    // axios.get().then((mails) => {
    //     const formatted = mails.map((mail) => _createMail(mail.))
    // })
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
    return mails
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
