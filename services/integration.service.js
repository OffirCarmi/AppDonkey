import { keepService } from '../apps/keep/services/keep.service.js'
import { mailService } from '../apps/mail/services/mail.service.js'

export const Integration = {
    mailToKeep,
    keepToMail
}

function mailToKeep(txt) {
    console.log(txt);
    keepService.addKeep(txt, 'keep-txt')
}

function keepToMail(txt) {
    const newMail = mailService.createMailFromKeep(txt)
    console.log(txt);
}