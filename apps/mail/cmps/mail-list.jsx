import { utilService } from "../services/util.service.js";
import { MailPreview } from "../cmps/mail-preview.jsx";
import { MailFilter } from '../cmps/mail-filter.jsx';
const { Link } = ReactRouterDOM

export function MailList({ mails, onDelete, onMail, handleFilterChange, onToggleRead, inputTxt, onSort, pageNum, onPageChange }) {
    const mailsToDisplay = mails.slice(pageNum * 10, pageNum * 10 + 10)
    if (!mails.length) return <section><h1>No mails in this category</h1></section>

    return <section className="mail-container flex col">
        <MailFilter handleFilterChange={handleFilterChange} inputTxt={inputTxt} onSort={onSort} />
        {mailsToDisplay.map((mail) => <MailPreview
            key={mail.id}
            mail={mail}
            onDelete={onDelete}
            onMail={onMail}
            onToggleRead={onToggleRead}
        />)}
        <section className="paging-btn">
            <button onClick={onPageChange} value={-1}>Back</button>
            <span>Page: {pageNum + 1}</span>
            <button onClick={onPageChange} value={1}>Next</button>
        </section>
    </section>
}