import { utilService } from "../services/util.service.js";
import { MailPreview } from "../cmps/mail-preview.jsx";
import { MailFilter } from '../cmps/mail-filter.jsx';
const { Link } = ReactRouterDOM

export function MailList({ mails, onDelete, onMail, handleFilterChange, onToggleRead, inputTxt, onSort }) {
    return <section className="mail-container flex col">
        <MailFilter handleFilterChange={handleFilterChange} inputTxt={inputTxt} onSort={onSort} />
        {mails.length && mails.map((mail) => <MailPreview
            key={mail.id}
            mail={mail}
            onDelete={onDelete}
            onMail={onMail}
            onToggleRead={onToggleRead}
        />) || <section><h1>No mails in this category</h1></section>}
    </section>
}