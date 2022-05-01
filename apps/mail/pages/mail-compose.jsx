import { eventBusService } from "../../../services/event-bus.service.js";
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
        const val = ev.currentTarget.value
        const field = ev.currentTarget.name
        this.setState((prevState) => ({ ...prevState, [field]: val }))
    }

    onSend = (ev) => {
        ev.preventDefault()
        if (Object.values(this.state).some(field => !field)) {
            eventBusService.emit('user-msg', { txt: 'Please fill out all fields', type: 'danger' })
            return
        }
        mailService.addMail(this.state)
        eventBusService.emit('user-msg', { txt: 'Sent', type: 'success' })
        this.props.toggleCompose()
    }

    render() {
        const { body, subject, to } = this.state
        return <section className="compose-container flex col">
            <div className="compose-head">
                <button className="compose-exit" onClick={() => this.props.toggleCompose()}>X</button>
            </div>
            <input type="email" multiple={true} placeholder="To" value={to} name="to" onChange={this.handleWrite} required autoComplete="off" />
            <input type="text" placeholder="Subject" value={subject} name="subject" onChange={this.handleWrite} required autoComplete="off" />
            <textarea className="mail-body" value={body} name="body" onChange={this.handleWrite} required ></textarea>
            <div className="compose-tools">
                <button className="send-btn" onClick={this.onSend}>Send</button>
            </div>
        </section>
    }

}