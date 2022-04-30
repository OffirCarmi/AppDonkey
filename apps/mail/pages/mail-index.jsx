import { eventBusService } from "../../../services/event-bus.service.js";
import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service.js";

import { Loader } from "../../../cmps/loader.jsx";
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
            mailbox: 'inbox',
            isReversed: false
        },
        unreadCount: 0
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        return mailService.query(this.state.criteria)
            .then(({ mails, count }) => {

                this.setState({ mails, unreadCount: count })
            })
    }

    onDelete = (id) => {
        mailService.deleteMail(id)
            .then(() => this.loadMails()).then(() => {
                eventBusService.emit('user-msg', { txt: 'Mail deleted', type: 'success' })
            })
    }

    onMail = (id) => {
        mailService.setRead(id).then(() => this.loadMails())
    }

    handleFilterChange = (ev) => {
        ev.preventDefault()
        // console.log('Mail - ev', ev.type)
        const val = ev.currentTarget.value
        const field = ev.currentTarget.name
        const { location, push } = this.props.history
        if (ev.type === 'change') {
            this.setState((prevState) => ({ criteria: { ...prevState.criteria, [field]: val } }))
        } else if (ev.type === 'submit') {
            this.loadMails()
        } else if (ev.type === 'click') {
            this.setState((prevState) => ({ criteria: { ...prevState.criteria, mailbox: val } }), () => {
                if (location.pathname !== `/mail/${this.state.criteria.mailbox}`) push(`/mail`);
                this.loadMails()
            })
        }
        // debounce(cb, wait)
    }

    onSort = (ev) => {
        const { mails, criteria: { isReversed: isReversed } } = this.state
        const field = ev.currentTarget.name
        const sortedMails = [].concat(mails).sort((a, b) => a[field] > b[field] ? 1 : -1)
        isReversed ? sortedMails.reverse() : sortedMails
        this.setState((prevState) => ({ mails: sortedMails, criteria: { ...prevState.criteria, isReversed: !prevState.criteria.isReversed } }))
    }

    onToggleRead = (id) => {
        mailService.toggleRead(id).then(() => this.loadMails())
    }

    render() {
        // console.log('index state', this.state.mails)
        const { mails, unreadCount } = this.state
        const { txt } = this.state.criteria
        if (!mails) return <Loader />
        return <section className="mail-app">
            <aside className="side">
                <NavLink to="/mail/compose" className="compose-link">Compose</NavLink>
                <button onClick={this.handleFilterChange} className="inbox-btn" value="inbox">
                    <div className="flex space-between">
                        <span>Inbox</span>
                        <span hidden={!unreadCount}>
                            {unreadCount}
                        </span>
                    </div>
                </button>
                <button onClick={this.handleFilterChange} className="unread-btn" value="unread"><span>Unread</span></button>
                <button onClick={this.handleFilterChange} className="read-btn" value="read"><span>Read</span></button>
                <button onClick={this.handleFilterChange} className="sent-btn" value="sentMail"><span>Sent Mail</span></button>
            </aside>
            <Switch>
                <Route path="/mail/compose" component={Compose} />
                <Route path="/mail/:mailId" render={(props) => <MailDetails onDelete={this.onDelete} {...props} />} />
                <Route path="/mail">
                    <MailList
                        mails={mails}
                        onDelete={this.onDelete}
                        onMail={this.onMail}
                        handleFilterChange={this.handleFilterChange}
                        onToggleRead={this.onToggleRead}
                        inputTxt={txt}
                        onSort={this.onSort}
                    />
                </Route>
            </Switch>
        </section>
    }
}