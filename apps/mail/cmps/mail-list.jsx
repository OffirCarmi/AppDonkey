import { utilService } from "../services/util.service.js";
import { MailPreview } from "../cmps/mail-preview.jsx";
import { MailFilter } from '../cmps/mail-filter.jsx';
const { Link } = ReactRouterDOM

export function MailList({ mails, onDelete, onMail, handleSearch, onToggleRead, inputTxt, onSort, pageNum, onPageChange, onStar }) {
    const mailsToDisplay = mails.slice(pageNum * 10, pageNum * 10 + 10)

    return <section className="mail-container flex col">
        <MailFilter handleSearch={handleSearch} inputTxt={inputTxt} onSort={onSort} />
        {mails.length && mailsToDisplay.map((mail) => <MailPreview
            key={mail.id}
            mail={mail}
            onDelete={onDelete}
            onMail={onMail}
            onToggleRead={onToggleRead}
            onStar={onStar}
        />) || <section><h1>No mails in this category</h1></section>}
        {mails.length > 10 && <section className="paging-btn">
            <button onClick={onPageChange} value={-1}>Back</button>
            <span>Page: {pageNum + 1}</span>
            <button onClick={onPageChange} value={1}>Next</button>
        </section>}
    </section>
}