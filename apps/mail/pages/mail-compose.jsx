import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service.js";

const { Link } = ReactRouterDOM


export class Compose extends React.Component {
    state = {
        subject: '',
        body: '',
        to: '',
    }

    handleWrite = (ev) => {
        // console.log(ev)
        const val = ev.currentTarget.value
        const field = ev.currentTarget.name
        this.setState((prevState) => ({ ...prevState, [field]: val }))
    }

    onSend = (ev) => {
        ev.preventDefault()
        console.log(this.state)
        mailService.addMail(this.state)
        this.props.history.push('/mail')
    }

    render() {
        // console.log(this.props);
        const { body, subject, to } = this.state
        return <section className="compose-container flex col">
            <div className="compose-head">
                <button className="compose-exit" onClick={() => this.props.history.push('/mail')}>X</button>
            </div>
            <input type="email" multiple={true} placeholder="To" value={to} name="to" onChange={this.handleWrite} autoComplete="off" />
            <input type="text" placeholder="Subject" value={subject} name="subject" onChange={this.handleWrite} autoComplete="off" />
            <textarea className="mail-body" value={body} name="body" onChange={this.handleWrite}></textarea>
            <div className="compose-tools">
                <button onClick={this.onSend}>Send</button>
            </div>
        </section>
    }

}