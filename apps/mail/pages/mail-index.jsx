import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js";

import { MailList } from "../cmps/mail-list.jsx";
import { MailDetails } from "../pages/mail-details.jsx";

const { Route, Switch } = ReactRouterDOM

export class Mail extends React.Component {
    state = {
        mails: null
    }

    componentDidMount() {
        console.log('index mounted');
        this.loadMails()

    }

    componentDidUpdate() {

        console.log('index updated', this.state);
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

    render() {
        // console.log('index state', this.props)
        const { mails } = this.state
        if (!mails) return <React.Fragment></React.Fragment>
        return <section className="mail-app">
            <aside className="side">
                <button>Compose</button>
                <ul>
                    <li>catagories</li>
                </ul>
            </aside>
            {/* {this.props.history.location.pathname === '/appDonkey/mail' && <MailList mails={mails} />} */}
            <Switch>
                <Route path="/appDonkey/mail/:mailId" render={(props) => <MailDetails onDelete={this.onDelete} {...props} />} />
                <Route path="/appDonkey/mail">
                    <MailList mails={mails} onDelete={this.onDelete} />
                </Route>
            </Switch>

        </section>
    }
}