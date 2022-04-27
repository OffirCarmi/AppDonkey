import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js";
import { MailList } from "../cmps/mail-list.jsx";

export class Mail extends React.Component {
    state = {
        mails: null
    }

    componentDidMount() {
        mailService.query().then((mails) => this.setState({ mails }))
    }


    render() {
        console.log(this.state)
        const { mails } = this.state
        return <section className="mail-wrapper">
            <aside className="side">
                <button>Compose</button>
                <ul>
                    <li>catagories</li>
                </ul>
            </aside>
            <article className="artical">
                {mails && <MailList mails={mails} />}
            </article>
        </section>
    }
}