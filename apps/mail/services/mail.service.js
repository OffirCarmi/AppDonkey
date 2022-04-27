import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
    query,
}

const KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullName: 'Spike Spiegel'
}

function query(criteria) {

    let mails = _loadFromStorage()
    if (!mails) {
        console.log('mails from fetch')

        return _fetchEmails().then((newMails) => {
            _saveToStorage(newMails)
            if (typeof (criteria) === 'string') {
                return _getById(criteria, newMails)
            }
            return newMails
        })
    }

    if (typeof (criteria) === 'string') {
        return _getById(criteria, mails)
    }
    console.log('mails from storage')
    return Promise.resolve(mails)
}

function _getById(mailId, mails) {
    const searchedMail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(searchedMail)
    
    // return _fetchEmails().then((mails) => {
    //     const searchedMail = mails.find(mail => mailId === mail.id)
    //     console.log('return_fetchEmails - searchedMail', searchedMail)
    //     return searchedMail
    // })
}

function _fetchEmails() {
    const mail = [{
        id: utilService.makeId(),
        subject: 'Cant touch this',
        body: 'Ow yeah, you cant touch this',
        isRead: false,
        sentAt: Date.now(),
        to: 'mimime@email.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Cant touch this',
        body: 'Ow yeah, you cant touch this',
        isRead: false,
        sentAt: Date.now(),
        to: 'mimime@email.com'
    },
    {
        id: utilService.makeId(),
        subject: 'Cant touch this',
        body: 'Ow yeah, you cant touch this',
        isRead: false,
        sentAt: Date.now(),
        to: 'mimime@email.com'
    }]
    return Promise.resolve(mail)
    // axios.get()
}

function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
