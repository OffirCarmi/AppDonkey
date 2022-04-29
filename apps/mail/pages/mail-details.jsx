import { mailService } from "../services/mail.service.js";


export class MailDetails extends React.Component {
    state = {
        mail: null
    }


    componentDidMount() {
        const { mailId } = this.props.match.params
        mailService.query(mailId).then((mail) => this.setState({ mail }))
    }

    render() {
        // console.log('props from details', this.props)
        const { mail } = this.state
        if (!mail) return <React.Fragment></React.Fragment>
        const { id, subject, body, isRead, to, from, senderFullname, sentAt } = mail
        return <section className="detail-container">
            <h1 >{subject}</h1>
            <h4>{senderFullname} - <span>{from}</span></h4>
            <p>{body}</p>
            <button onClick={() => {
                this.props.history.push('/mail')
                this.props.onDelete(id)
            }}>Delete</button>
            <button onClick={() => this.props.history.push('/mail')}>Back</button>
        </section>
    }
}