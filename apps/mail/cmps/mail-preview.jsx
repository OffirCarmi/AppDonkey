import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onDelete, onMail, onToggleRead }) {
    const { id, subject, body, isRead, to, from, senderFullname, sentAt } = mail
    const readClass = isRead ? 'read' : ''
    const formattedDate = utilService.getFormattedDate(sentAt)
    return <Link onClick={() => onMail(id)} to={`/appDonkey/mail/${mail.id}`} className={`preview-container flex space-between  ${readClass}`}>
        {/* <button className="clean-btn">⭐</button> */}
        <h3 >
            {senderFullname}
        </h3>
        <h3 className="prev-subject ">{subject}<span className="prev-body"> - {body}</span></h3>
        <button title={isRead ? 'Mark as unread' : 'Mark as read'} onClick={(ev) => {
            ev.preventDefault()
            ev.stopPropagation()
            onToggleRead(id)
        }}>{isRead ? '📧' : '💌'}</button>
        <h3 className="mail-date">{formattedDate}</h3>
        {/* <button onClick={(ev) => {
            ev.preventDefault()
            onDelete(id)
        }} className="prev-delete">X</button> */}
    </Link>
};
