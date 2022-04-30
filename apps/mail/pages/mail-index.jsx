import { eventBusService } from "../../../services/event-bus.service.js";
import { utilService } from "../../../services/util.service.js";
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
            mailbox: 'inbox',
            isReversed: false
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
        if (!mails) return <React.Fragment></React.Fragment>
        return <section className="mail-app">
            <aside className="side">
                <NavLink to="/mail/compose" className="compose-btn">Compose</NavLink>
                <button onClick={this.handleFilterChange} className="inbox-btn" value="inbox">Inbox<span hidden={!unreadCount}> ({unreadCount})</span></button>
                <button onClick={this.handleFilterChange} className="unread-btn" value="unread">Unread</button>
                <button onClick={this.handleFilterChange} className="read-btn" value="read">Read</button>
                <button onClick={this.handleFilterChange} className="sent-btn" value="sentMail">Sent Mail</button>
            </aside>
            <Switch>
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
            <Route path="/mail/compose" component={Compose} />
        </section>
    }
}