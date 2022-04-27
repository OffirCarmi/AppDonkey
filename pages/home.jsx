import { Header } from '../cmps/header.jsx'
import { About } from 'about.jsx'
import { Book } from 'book.jsx'
import { Mail } from 'mail.jsx'
import { Keep } from 'keep.jsx'
import { Footer } from '../cmps/footer.jsx'
const { Route, Switch } = ReactRouterDOM



export class Home extends React.Component {
    state = {

    }

    render() {
        return <div className="app flex col space-between">
            <Header />
            {/* <div className="home">Hello from home</div> */}
            <Switch>
                <Route path="/appDonkey/about" component={About} />
                <Route path="/appDonkey/book" component={Book} />
                <Route path="/appDonkey/mail" component={Mail} />
                <Route path="/appDonkey/keep" component={Keep} />
            </Switch>
            <Footer />

        </div>
    }
}
