import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onDelete, onMail, onToggleRead }) {
    const { id, subject, body, isRead, to, sentAt } = mail
    const readClass = isRead ? 'read' : ''
    const formattedDate = mailService.getFormattedDate(sentAt)
    return <Link onClick={() => onMail(id)} to={`/appDonkey/mail/${mail.id}`} className={`preview-container flex space-between  ${readClass}`}>
        <h3 className="prev-subject">
            {/* <button className="clean-btn">⭐</button> */}
            {subject}
        </h3>
        <h3 className="prev-body">{body}</h3>
        <button title={isRead ? 'Mark as unread' : 'Mark as read'} onClick={(ev) => {
            ev.preventDefault()
            ev.stopPropagation()
            onToggleRead(id)
            }}>{isRead ? '📧' : '💌'}</button>
        <h3>{formattedDate}</h3>
        {/* <button onClick={(ev) => {
            ev.preventDefault()
            onDelete(id)
        }} className="prev-delete">X</button> */}
    </Link>
};
