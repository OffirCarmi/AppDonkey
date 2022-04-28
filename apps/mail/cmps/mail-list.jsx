import { utilService } from "../services/util.service.js";
import { MailPreview } from "../cmps/mail-preview.jsx";
import { MailFilter } from '../cmps/mail-filter.jsx';
const { Link } = ReactRouterDOM

export function MailList({ mails, onDelete, onMail, handleFilterChange, onToggleRead }) {
    return <section className="mail-container flex col">
        <MailFilter handleFilterChange={handleFilterChange} />
        {mails.map((mail) => <MailPreview
        key={mail.id}
        mail={mail}
        onDelete={onDelete}
        onMail={onMail}
        onToggleRead={onToggleRead}
        />)}
    </section>
}