import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
    query,
    deleteMail
}

const KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appdonkey.com',
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

function deleteMail(id) {
    let mails = _loadFromStorage()
    mails = mails.filter((mail) => mail.id !== id )
    _saveToStorage(mails)
    console.log('deleted');
    return Promise.resolve()
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
        subject: `Join us`,
        body: `Pro Tools Artist is here, opening the door for a new generation of producers, 
        beatmakers, and artists to access the DAW that musical careers are built on.
        Join our live stream with hosts Gaurav Harrish from Avid and audio engineer Wavy Wayne—alongside 
        ASCAP award-winning songwriter and artist`,
        isRead: false,
        sentAt: Date.now(),
        to: 'mimime@email.com'
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
