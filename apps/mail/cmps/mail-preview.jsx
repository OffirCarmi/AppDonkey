const { Link } = ReactRouterDOM

export function MailPreview({ mail, onDelete, onMail }) {
    const { id, subject, body, isRead, to } = mail
    const readClass = isRead ? 'read' : ''
    return <Link onClick={() => onMail(id)} to={`/appDonkey/mail/${mail.id}`} className={`preview-container flex space-between ${readClass}`}>
        <h3 className="prev-subject">Subject: {subject}</h3>
        <h3 className="prev-body">Body: {body}</h3>
        <h3>{isRead ? 'Read' : 'Unread'}</h3>
        <button onClick={(ev) => {
            ev.preventDefault()
            onDelete(id)
        }} className="prev-delete">X</button>
    </Link>
};
