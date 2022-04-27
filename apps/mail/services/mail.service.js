import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

const loggedinUser = {
    email: 'user@appsus.com',
    fullName: 'Spike Spiegel'
}
export const mailService = {
    query,
}


function query(criteria) {
    return _fetchEmails()
}

function getLoggedinUser() {
    return loggedinUser
}

function _fetchEmails() {
    const email = [{
        id: utilService.makeId(),
        subject: 'Cant touch this',
        body: 'Ow yeah, you cant touch this',
        isRead: false,
        sentAt: Date.now(),
        to: 'mimime@email.com'
    }]
    return Promise.resolve(email)
    // axios.get()
}