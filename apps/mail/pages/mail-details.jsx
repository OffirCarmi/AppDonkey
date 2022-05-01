import { mailService } from "../services/mail.service.js";
import { Integration } from "../../../services/integration.service.js";

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: null
    }


    componentDidMount() {
        const { mailId } = this.props.match.params
        mailService.query(mailId).then((mail) => this.setState({ mail }))
    }

    render() {
        const { mail } = this.state
        if (!mail) return <React.Fragment></React.Fragment>
        const { id, subject, body, isRead, to, from, senderFullname, sentAt } = mail
        return <section className="detail-container">
            <div className="detail-tools">
                <button className="back-btn" onClick={() => this.props.history.push('/mail')}></button>
                <button className="delete-btn" onClick={() => {
                    this.props.history.push('/mail')
                    this.props.onDelete(id)
                }}></button>
                <Link to="/keep" className="to-keep-btn" onClick={() => Integration.mailToKeep(body)}></Link>
            </div>
            <section className="artical-container">
                <h1 className="detail-subj">{subject}</h1>
                <h4 className="detail-sender">{senderFullname} - <span>{from}</span></h4>
                <p className="detail-body">{body}</p>
            </section>
        </section >
    }
}