const { Route, Switch, Link } = ReactRouterDOM
export class Home extends React.Component {
    render() {
        return <div className="home flex justify-center">
            <section className="apps-container">
                <Link to="/keep"><button className="home-btn-apps">Keep </button></Link>
                <Link to="/mail"><button className="home-btn-apps">Mail </button></Link>
                <Link to="/book"><button className="home-btn-apps">Book </button></Link>
                {/* <Link to="/keep">Keep</Link>
            <Link to="/mail">Mail</Link>
            <Link to="/book">Book</Link> */}
            </section>
        </div>
    }
}