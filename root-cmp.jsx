import { Welcome } from 'pages/welcome.jsx'
import { Home } from 'pages/home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <Switch>
            <Route path="/appDoneky" component={Home} />
            <Route path="/" component={Welcome} />
        </Switch>
    </Router>
}