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
        return <section className="detail-container">
            <h1 >{mail.subject}</h1>
            <h4>{mail.from}</h4>
            <p>{mail.body}</p>
            <button onClick={() => {
                this.props.history.push('/appDonkey/mail')
                this.props.onDelete(mail.id)
            }}>Delete</button>
            <button onClick={() => this.props.history.push('/appDonkey/mail')}>Back</button>
        </section>
    }
}