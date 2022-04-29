import { Welcome } from 'pages/welcome.jsx'
import { Start } from 'pages/start.jsx'

import { Header } from './cmps/header.jsx'
import { Footer } from './cmps/footer.jsx'

import { About } from './pages/about.jsx'
import { Book } from './apps/book/pages/book-index.jsx'
import { Mail } from './apps/mail/pages/mail-index.jsx'
import { Keep } from './apps/keep/pages/keep-app.jsx'
import { Home } from './pages/home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

// className="app flex col space-between"

export function App() {
    return <section>
        <Router>
            <Route path="/:any" component={Header} />
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/book" component={Book} />
                <Route path="/mail" component={Mail} />
                <Route path="/keep" component={Keep} />
                <Route path="/home" component={Home} />
                <Route path="/" component={Welcome} />
            </Switch>
            <Route path="/:any" component={Footer} />
        </Router>
    </section>
}