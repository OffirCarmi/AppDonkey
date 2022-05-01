const { Route, Switch, Link } = ReactRouterDOM
export class Home extends React.Component {
    render() {
        return <div className="home flex col align-center justify-center">
            <section className="team-member flex space-between justify-center">
                <section className="app-preview flex">
                    <Link to="/keep" className="keep-link">
                        <img className="trans" src="assets/img/keep-logo.png" alt="" />
                    </Link>
                </section>
                <section className="partner flex align-center">
                    <img src="assets/img/team/offir.jpg" alt="profile-photo" />
                    <section className="partner-info flex col">
                        <h1>Offir Carmi</h1>
                        <h3>Full stack develeoper to become</h3>
                    </section>
                </section>
            </section>

            <section className="team-member flex space-between justify-center">
                <section className="app-preview flex">
                    <Link to="/mail" className="mail-link">
                        <img src="assets/img/mail-logo.png" alt="" />
                    </Link>
                </section>
                <section className="partner flex align-center">
                    <img src="assets/img/team/itay.jpg" alt="profile-photo" />
                    <section className="partner-info flex col">
                        <h1>Itay Zonshine</h1>
                        <h3>Full stack develeoper to become</h3>
                    </section>
                </section>
            </section>

        </div>

    }
}
// export class Home extends React.Component {
//     render() {
//         return <div className="home flex justify-center">
//             <section className="apps-container">
//                 <Link to="/keep" className="keep-link">
//                     <img src="assets/img/keep-logo.png" alt="" />
//                     <button className="home-btn-apps">Keep</button>
//                     </Link>
//                 <Link to="/mail" className="mail-link">
//                     <img src="assets/img/mail-logo.png" alt="" />
//                 <button className="home-btn-apps">Mail</button>
//                 </Link>

//                 {/* <Link to="/book" className="book-link"><img src="../assets/img/book-logo.png" alt="" /><button className="home-btn-apps">Book</button></Link> */}
//             </section>
//         </div>
//     }
// }