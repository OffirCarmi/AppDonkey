import { utilService } from "../services/util.service.js";
import { MailPreview } from "../cmps/mail-preview.jsx";
const { Link } = ReactRouterDOM

export function MailList({ mails }) {
    return <section className="mail-container flex col">
            {mails.map((mail) => <MailPreview key={mail.id} mail={mail} />)}
        </section>
}