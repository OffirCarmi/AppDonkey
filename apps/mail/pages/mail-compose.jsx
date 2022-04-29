import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service";

const { Link } = ReactRouterDOM


export class Compose extends React.Component {
    state = {
        subject: '',
        body: '',
        to: '',
    }

    handleWrite = (ev) => {
        console.log(ev)
        const val = ev.currentTarget.value
        const field = ev.currentTarget.name
        this.setState((prevState) => ({ ...prevState, [field]: val }))
    }

    onSend = (ev) => {
        ev.preventDefault()
    }

    render() {
        console.log('composing',);
        const { body, subject, to } = this.state
        return <section className="compose-container flex col">
            <div className="compose-head">
                <button className="compose-exit" onClick={() => this.props.history.push('/appDonkey/mail')}>X</button>
            </div>
            <input type="text" placeholder="To" value={to} name="to" onChange={this.handleWrite} autoComplete="off"/>
            <input type="text" placeholder="Subject" value={subject} name="subject" onChange={this.handleWrite} autoComplete="off"/>
            <textarea className="mail-body" value={body} name="body" onChange={this.handleWrite}></textarea>
            <div className="compose-tools">
                <button>Send</button>
            </div>
        </section>
    }

}