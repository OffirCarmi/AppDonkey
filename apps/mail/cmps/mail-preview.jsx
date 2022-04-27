const { Link } = ReactRouterDOM

export function MailPreview({ mail, onDelete }) {
    const { id, subject, body, isRead, to } = mail
    return <Link to={`/appDonkey/mail/${mail.id}`} className="preview-container flex space-between">
        <h3 className="prev-subject">Subject: {subject}</h3>
        <h3 className="prev-body">Body: {body}</h3>
        <button onClick={(ev) => {
            ev.preventDefault()
            onDelete(id)
        }} className="prev-delete">X</button>
        <h3>{isRead ? 'Read' : 'Unread'}</h3>
    </Link>
};
