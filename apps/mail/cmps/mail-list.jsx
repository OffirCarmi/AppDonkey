import { utilService } from "../services/util.service.js";
import { MailPreview } from "../cmps/mail-preview.jsx";
const { Link } = ReactRouterDOM

export function MailList({ mails }) {
    return (
        <section>
            {mails.map((mail) => <MailPreview mail={mail} />)}
        </section>
    )
}