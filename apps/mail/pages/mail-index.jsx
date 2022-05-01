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
        unreadCount: 0,
        isMenuOpen: false,
        page: 0
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

    onToggleRead = (id) => {
        mailService.toggleRead(id).then(() => this.loadMails())
    }

    onStar = (id) => {
        mailService.toggleStared(id).then(() => this.loadMails())
    }

    handleFilterChange = (ev) => {
        ev.preventDefault()
        const { location, push } = this.props.history
        const val = ev.currentTarget.value
        if (ev.type === 'submit') {
            this.loadMails()
        } else if (ev.type === 'click') {
            this.closeMenu()
            this.setState((prevState) => ({ page: 0, criteria: { ...prevState.criteria, mailbox: val } }), () => {
                if (location.pathname !== `/mail/${this.state.criteria.mailbox}`) push(`/mail`);
                this.loadMails()
            })
        }
    }

    handleSearch = (ev) => {
        ev.preventDefault()
        const val = ev.currentTarget.value
        const field = ev.currentTarget.name
        if (ev.type === 'change') {
            this.setState((prevState) => ({ criteria: { ...prevState.criteria, [field]: val } }), this.loadMails)
        }

    }

    onSort = (ev) => {
        const { mails, criteria: { isReversed: isReversed } } = this.state
        const field = ev.currentTarget.name
        const sortedMails = [].concat(mails).sort((a, b) => a[field] > b[field] ? 1 : -1)
        isReversed ? sortedMails.reverse() : sortedMails
        this.setState((prevState) => ({ mails: sortedMails, criteria: { ...prevState.criteria, isReversed: !prevState.criteria.isReversed } }))
    }

    onMenu = () => {
        const { isMenuOpen } = this.state
        isMenuOpen ? this.closeMenu() : this.openMenu()

    }

    closeMenu = () => {
        this.setState((prevState) => ({ isMenuOpen: false }))
    }

    openMenu = () => {
        this.setState((prevState) => ({ isMenuOpen: true }))
    }


    onPageChange = (ev) => {
        const { mails, page } = this.state
        const val = +ev.currentTarget.value
        this.setState((prevState) => {
            if (mails.length <= (prevState.page + val) * 10 || prevState.page + val < 0) return
            return { page: prevState.page + val }
        })
    }

    render() {
        const { mails, unreadCount, isMenuOpen, page } = this.state
        const { txt, mailbox } = this.state.criteria
        if (!mails) return <Loader />
        return <section className="mail-app">
            <aside className={`side ${isMenuOpen ? 'menu-open' : ''}`}>
                {isMenuOpen && <button onClick={this.closeMenu} className="exit-menu">X</button>}
                <NavLink to="/mail/compose" className="compose-link" onClick={
                    () => this.state.isMenuOpen ? this.closeMenu() : ''
                }>Compose</NavLink>
                <button onClick={this.handleFilterChange} className={`inbox-btn ${mailbox === 'inbox' ? 'in-box' : ''}`} value="inbox">
                    <div className="flex space-between">
                        <span>Inbox</span>
                        <span hidden={!unreadCount}>
                            {unreadCount}
                        </span>
                    </div>
                </button>
                <button onClick={this.handleFilterChange} className={`unread-btn ${mailbox === 'unread' ? 'in-box' : ''}`}
                    value="unread"><span>Unread</span></button>
                <button onClick={this.handleFilterChange} className={`read-btn ${mailbox === 'read' ? 'in-box' : ''}`}
                    value="read"><span>Read</span></button>
                <button onClick={this.handleFilterChange} className={`stared-btn ${mailbox === 'read' ? 'stared' : ''}`}
                    value="stared"><span>Stared</span></button>
                <button onClick={this.handleFilterChange} className={`sent-btn ${mailbox === 'sentMail' ? 'in-box' : ''}`}
                    value="sentMail"><span>Sent Mail</span></button>
            </aside>
            {!isMenuOpen && <img className="menu-img"
                src="./assets/img/icons/category.webp"
                onClick={this.onMenu}
            ></img>}
            <Switch>
                <Route path="/mail/compose" component={Compose} />
                <Route path="/mail/:mailId" render={(props) => <MailDetails onDelete={this.onDelete} {...props} />} />
                <Route path="/mail">
                    <MailList
                        mails={mails}
                        onDelete={this.onDelete}
                        onMail={this.onMail}
                        handleSearch={this.handleSearch}
                        onToggleRead={this.onToggleRead}
                        inputTxt={txt}
                        onSort={this.onSort}
                        pageNum={page}
                        onPageChange={this.onPageChange}
                        onStar={this.onStar}
                    />
                </Route>
            </Switch>
        </section>
    }
}