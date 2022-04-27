import { Welcome } from 'pages/welcome.jsx'
import { Start } from 'pages/start.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <Switch>
            <Route path="/appDonkey" component={Start} />
            <Route path="/" component={Welcome} />
        </Switch>
    </Router>
}