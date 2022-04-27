export function MailPreview({ mail }) {
    const { id, subject, body, isRead, to } = mail
    return <ul className="flex space-between clean-list">
        <li>Subject: {subject}</li>
        <li>Body: {body}</li>
        <li>To: {to}</li>
        <li>{isRead ? 'Unread' : 'Read'}</li>
    </ul>
};
