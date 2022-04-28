import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js";

import { MailList } from "../cmps/mail-list.jsx";
import { MailDetails } from "mail-details.jsx";
import { Compose } from "mail-compose.jsx";

const { Route, Switch, NavLink } = ReactRouterDOM

export class Mail extends React.Component {
    state = {
        mails: null,
        criteria: {
            txt: '',
            isRead: null,
            isStared: null,
            labels: [],
            mailbox: 'inbox'
        }
    }

    componentDidMount() {
        // console.log('index mounted');
        this.loadMails()

    }

    componentDidUpdate() {
        // console.log('index updated', this.state);
        // if(this.props) this.loadMails()
    }

    loadMails = () => {
        return mailService.query(this.state.criteria)
            .then((mails) => this.setState({ mails }))
    }

    onDelete = (id) => {
        mailService.deleteMail(id)
            .then(() => this.loadMails())
    }

    onMail = (id) => {
        mailService.setRead(id).then(() => this.loadMails())
    }

    handleFilterChange = (ev) => {
        ev.preventDefault()
        console.log('Mail - ev', ev.type)
        if (ev.type === 'change') {
            const val = ev.currentTarget.value
            const field = ev.currentTarget.name
            this.setState((prevState) => ({ criteria: { ...prevState.criteria, [field]: val } }))
        } else if (ev.type === 'submit') {
            this.loadMails()
        }
        // debounce(cb, wait)
    }

    onToggleRead = (id) => {
        mailService.toggleRead(id).then(() => this.loadMails())
    }

    render() {
        // console.log('index state', this.state)
        const { mails } = this.state
        const { txt } = this.state.criteria
        if (!mails) return <React.Fragment></React.Fragment>
        return <section className="mail-app">
            <aside className="side">
                <NavLink to="/appDonkey/mail/compose">Compose</NavLink>
                <button>Inbox</button>
                <button>Starred</button>
                <button>Sent Mail</button>
            </aside>
            {/* {this.props.history.location.pathname === '/appDonkey/mail' && <MailList mails={mails} />} */}
            <Switch>
                <Route path="/appDonkey/mail/:mailId" render={(props) => <MailDetails onDelete={this.onDelete} {...props} />} />
                <Route path="/appDonkey/compose" component={Compose} />
                <Route path="/appDonkey/mail">
                    <MailList
                        mails={mails}
                        onDelete={this.onDelete}
                        onMail={this.onMail}
                        handleFilterChange={this.handleFilterChange}
                        onToggleRead={this.onToggleRead}
                        inputTxt={txt}
                    />
                </Route>
            </Switch>
        </section>
    }
}