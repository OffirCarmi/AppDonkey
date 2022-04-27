import { Header } from '../cmps/header.jsx'
import { About } from 'about.jsx'
import { Book } from '../apps/book/pages/book-index.jsx'
import { Mail } from '../apps/mail/pages/mail-index.jsx'
import { Keep } from '../apps/keep/pages/note-index.jsx'
import { Home } from 'home.jsx'

import { Footer } from '../cmps/footer.jsx'
const { Route, Switch } = ReactRouterDOM



export class Start extends React.Component {
    state = {

    }
    render() {
        return <div className="app flex col space-between">
            <Header />
            <Switch>
                <Route path="/appDonkey/about" component={About} />
                <Route path="/appDonkey/book" component={Book} />
                <Route path="/appDonkey/mail" component={Mail} />
                <Route path="/appDonkey/keep" component={Keep} />
                <Route path="/appDonkey/" component={Home} />
            </Switch>
            <Footer />

        </div>
    }
}

