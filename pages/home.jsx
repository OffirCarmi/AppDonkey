const { Route, Switch, Link } = ReactRouterDOM
export class Home extends React.Component {
    render() {
        return <div className="home">
            <Link to="/keep">Keep</Link>
            <Link to="/mail">Mail</Link>
            <Link to="/book">Book</Link>
        </div>
    }
}