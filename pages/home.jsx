const { Route, Switch, Link } = ReactRouterDOM
export class Home extends React.Component {
    render() {
        return <div className="home flex justify-center">
            <section className="apps-container">
                <Link to="/keep" className="keep-link"><img src="../assets/img/keep-logo.png" alt="" /><button className="home-btn-apps">Keep</button></Link>
                <Link to="/mail" className="mail-link"><img src="../assets/img/mail-logo.png" alt="" /><button className="home-btn-apps">Mail</button></Link>
                {/* <Link to="/book" className="book-link"><img src="../assets/img/book-logo.png" alt="" /><button className="home-btn-apps">Book</button></Link> */}
            </section>
        </div>
    }
}