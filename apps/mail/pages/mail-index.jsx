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
        mailService.query()
            .then((mails) => this.setState({ mails }))
    }


    render() {
        // console.log(this.state)
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
                <Route path="/appDonkey/mail/:mailId" component={MailDetails} />
                <Route path="/appDonkey/mail">
                    <MailList mails={mails} />
                </Route>
            </Switch>

        </section>
    }
}