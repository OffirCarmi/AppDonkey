import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onDelete, onMail, onToggleRead }) {
    const { id, subject, body, isRead, isStared, to, from, senderFullname, sentAt } = mail
    const readClass = isRead ? 'read' : ''
    const formattedDate = utilService.getFormattedDate(sentAt)
    return <Link onClick={() => onMail(id)} to={`/mail/${mail.id}`} className={`preview-container flex  ${readClass} `}>
        {/* <button className={`star-btn  ${isStared ? 'starred' : ''}`}></button> */}
        <h3 className="prev-name">
            {senderFullname}
        </h3>
        <h3 className="prev-subject ">{subject}<span className="prev-body"> - {body}</span></h3>
        <button className="prev-mark" title={isRead ? 'Mark as unread' : 'Mark as read'} data-symbol={isRead ? `` : ``}
            onClick={(ev) => {
                ev.preventDefault()
                ev.stopPropagation()
                onToggleRead(id)
            }}></button>
        <h3 className="prev-date">{formattedDate}</h3>
    </Link>
};
