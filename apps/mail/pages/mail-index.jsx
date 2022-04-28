import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js";

import { MailList } from "../cmps/mail-list.jsx";
import { MailDetails } from "../pages/mail-details.jsx";

const { Route, Switch, NavLink } = ReactRouterDOM

export class Mail extends React.Component {
    state = {
        mails: null,
        criteria: {
            txt: '',
            isRead: true,
            isStared: true,
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
        return mailService.query()
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
    }

    render() {
        console.log('index state', this.props)
        const { mails } = this.state
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
                <Route path="/appDonkey/mail">
                    <MailList mails={mails} onDelete={this.onDelete} onMail={this.onMail} handleFilterChange={this.handleFilterChange} />
                </Route>
            </Switch>

        </section>
    }
}