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
    return _createMail({ subject: 'Hello from Keep', body: txt, from: loggedinUser.email, senderFullname: loggedinUser.fullName })
}

function _createMail({ subject, body, to, from, senderFullname, date }) {
    console.log(to)
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
        from: 'johanna.h@email.com',
        senderFullname: 'johanna johan'
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
        from: 'Roy_Batty@email.com',
        senderFullname: 'Rutger Hauer'
    },
    {
        id: utilService.makeId(),
        subject: `Ready to get going? So are we`,
        body: `et's take a trip together
        Uber makes it easy to tackle your errands or commute to the office. Wherever you're going, we'll take you there.`,
        isRead: false,
        sentAt: new Date(`1/1/2016`),
        to: `user@appdonkey.com`,
        from: `uber@uber.com`,
        senderFullname: `Uber`
    },
    {
        id: utilService.makeId(),
        subject: 'Join use!',
        body: `dherents of every religion are bound together by creeds and codes.

        These creeds state their aspirations, their duties, their mores and their beliefs. They align the religion’s purposes and reinforce the basic tenets of the religion.
        
        The codes and creeds of Scientology were written by L. Ron Hubbard in the 1950s during the formative years of the religion. They set the guidelines for the practice and expansion of Scientology and still serve those ends today.
        
        Included in these creeds are codes for the auditor, the supervisor, the manager and additional codes by which all Scientologists strive to live. Like Scientology, the usefulness of these principles determines their worth. Scientologists follow these precepts in applying Scientology Technology, in dealings with others and in the administration of their groups and the practice of their religion.`,
        isRead: false,
        sentAt: new Date('20/4/2021'),
        to: 'user@appdonkey.com',
        from: 'MediaRelations@ChurchofScientology.net',
        senderFullname: 'Robert Adams'
    },
    {
        id: utilService.makeId(),
        subject: 'What Is QAnon?',
        body: 'Explaining the “big tent conspiracy theory” that falsely claims that former President Trump is facing down a shadowy cabal of Democratic pedophiles.',
        isRead: false,
        sentAt: new Date('1/1/2010'),
        to: 'user@appdonkey.com',
        from: 'nytimes@nytimes.net',
        senderFullname: 'The New York Times'
    },
    {
        id: utilService.makeId(),
        subject: 'The bat',
        body: `Because we have to chase him. Because he's the hero Gotham deserves, but not the one it needs right now. So we'll hunt him. Because he can take it. Because he's not our hero. He's a silent guardian, a watchful protector. A dark knight.`,
        isRead: false,
        sentAt: new Date('8/10/2008'),
        to: 'user@appdonkey.com',
        from: 'gothem.police@hotmail.com',
        senderFullname: 'Lt. James Gordon'
    },
    {
        id: utilService.makeId(),
        subject: `Ya wanna know how I got these scars?`,
        body: `My father; was a drinker; and a fiend. And one night, he goes off craazier than usual. Mommy grabs the kitchen knife to defend herself. He doesn't like that. Not. One. Bit. So, me watching, he takes the knife to her, laughing while he does it. He turns to me and say, "Why so Serious?". He comes at me with the knife. "Why so serious?". Sticks the blade in my mouth. "Let's put a smile on that face!". Aaaaaand. (Turns to hostage behind victim) "Why so serious?" (cuts victim's mouth)`,
        isRead: false,
        sentAt: new Date(`10/6/2006`),
        to: `user@appdonkey.com`,
        from: `crazy@email.com`,
        senderFullname: `Heath Ledger`
    },
    {
        id: utilService.makeId(),
        subject: `Where's the code?????`,
        body: `You were suppose to upload the Github page two hours ago, Yaron is going to kill you tomorrow!`,
        isRead: false,
        sentAt: new Date(`30/4/2022`),
        to: `user@appdonkey.com`,
        from: `Idan_Gez@email.com`,
        senderFullname: `Idan Gez`
    },
    {
        id: utilService.makeId(),
        subject: `Sorry I'm taken`,
        body: `I don't know who you are. I don't know what you want. If you are looking for ransom I can tell you I don't have money, but what I do have are a very particular set of skills. Skills I have acquired over a very long career. Skills that make me a nightmare for people like you. If you let my daughter go now that'll be the end of it. I will not look for you, I will not pursue you, but if you don't, I will look for you, I will find you and I will kill you.`,
        isRead: false,
        sentAt: new Date(`30/4/2022`),
        to: `user@appdonkey.com`,
        from: `big.star@hollywood.com`,
        senderFullname: `Liam Neeson`
    },
    {
        id: utilService.makeId(),
        subject: `You've been hacked`,
        body: `You shouldn't have played with fire, now we are after you`,
        isRead: false,
        sentAt: new Date(`30/4/2022`),
        to: `user@appdonkey.com`,
        from: `poki.bo@gmail.com`,
        senderFullname: `Poki`
    },
    ]
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
