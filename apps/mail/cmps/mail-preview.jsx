const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    const { id, subject, body, isRead, to } = mail
    return <Link to={`/appDonkey/mail/${mail.id}`} className="preview-container flex space-between">
        <h3 className="prev-subject">Subject: {subject}</h3>
        <h3 className="prev-body">Body: {body}</h3>
        {/* <h3 className="prev-to">To: {to}</h3> */}
        <button className="prev-delete">X</button>
        <h3>{isRead ? 'Read' : 'Unread'}</h3>
    </Link>
};
