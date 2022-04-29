import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js";

import { MailList } from "../cmps/mail-list.jsx";
import { MailDetails } from "mail-details.jsx";
import { Compose } from "../pages/mail-compose.jsx";

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
        },
        unreadCount: 0
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
            .then(({ mails, count }) => {

                this.setState({ mails, unreadCount: count })
            })
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
        // console.log('Mail - ev', ev.type)
        const val = ev.currentTarget.value
        const field = ev.currentTarget.name
        if (ev.type === 'change') {
            this.setState((prevState) => ({ criteria: { ...prevState.criteria, [field]: val } }))
        } else if (ev.type === 'submit') {
            this.loadMails()
        } else if (ev.type === 'click') {
            this.setState((prevState) => ({ criteria: { ...prevState.criteria, mailbox: val } }), () => this.loadMails())
        }
        // debounce(cb, wait)
    }

    onToggleRead = (id) => {
        mailService.toggleRead(id).then(() => this.loadMails())
    }

    render() {
        // console.log('index state', this.state)
        const { mails, unreadCount } = this.state
        const { txt } = this.state.criteria
        if (!mails) return <React.Fragment></React.Fragment>
        return <section className="mail-app">
            <aside className="side">
                <NavLink to="/appDonkey/mail/compose">Compose</NavLink>
                {/* convert all to navlink because you cant click out of compose without it */}
                <button onClick={this.handleFilterChange} value="inbox">Inbox<span hidden={!unreadCount}> ({unreadCount})</span></button>
                <button onClick={this.handleFilterChange} value="unread">Unread</button>
                <button onClick={this.handleFilterChange} value="read">Read</button>
                <button onClick={this.handleFilterChange} value="sentMail">Sent Mail</button>
            </aside>
            {/* {this.props.history.location.pathname === '/appDonkey/mail' && <MailList mails={mails} />} */}
            <Switch>
                <Route path="/appDonkey/mail/compose" component={Compose} />
                <Route path="/appDonkey/mail/:mailId" render={(props) => <MailDetails onDelete={this.onDelete} {...props} />} />
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