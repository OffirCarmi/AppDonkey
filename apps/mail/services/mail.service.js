import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const mailService = {
    query,
    deleteMail,
    setRead,
    toggleRead,
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
                    const count = mails.filter((mail) => !mail.isRead && mail.to === loggedinUser.email).length
                    mails = _filterMail(mails, criteria)
                    return { mails, count }
                }
            })
    }

    if (typeof (criteria) === 'string') {
        return _getById(criteria, mails)
    }
    const count = mails.filter((mail) => !mail.isRead && mail.to === loggedinUser.email).length
    mails = _filterMail(mails, criteria)
    return Promise.resolve({ mails, count })
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
            mails = mails.filter((mail) => mail.to === loggedinUser.email)
            break
        case 'read':
            mails = mails.filter((mail) => mail.isRead && mail.to === loggedinUser.email)
            break;
        case 'unread':
            mails = mails.filter((mail) => !mail.isRead && mail.to === loggedinUser.email)
            break;
        case 'sentMail':
            mails = mails.filter((mail) => mail.to !== loggedinUser.email)
            break;
        default:
            break;
    }
    return mails
}

function createMailFromKeep(txt) {
    return _createMail({ subject: 'Made with Keep', body: txt, to, from: loggedinUser.email, senderFullname: loggedinUser.fullName })
}

function _createMail({ subject, body, to, from, senderFullname }) {
    if (!senderFullname) senderFullname = loggedinUser.fullName
    if (!from) from = loggedinUser.email
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
    const mail = [{
        id: utilService.makeId(),
        subject: `Join us`,
        body: `Pro Tools Artist is here, opening the door for a new generation of producers, 
        beatmakers, and artists to access the DAW that musical careers are built on.
        Join our live stream with hosts Gaurav Harrish from Avid and audio engineer Wavy Wayne—alongside 
        ASCAP award-winning songwriter and artist`,
        isRead: false,
        sentAt: new Date('1/1/1999'),
        to: 'user@appdonkey.com',
        from: 'mimime@email.com',
        senderFullname: 'MIMIME'
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
        sentAt: new Date('1/1/2020'),
        to: 'user@appdonkey.com',
        from: 'mimime@email.com',
        senderFullname: 'MIMIME'
    },
    {
        id: utilService.makeId(),
        subject: 'Cant touch this',
        body: 'Ow yeah, you cant touch this',
        isRead: false,
        sentAt: new Date('1/1/2016'),
        to: 'user@appdonkey.com',
        from: 'mimime@email.com',
        senderFullname: 'MIMIME'
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
