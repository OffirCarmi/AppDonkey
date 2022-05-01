const { withRouter } = ReactRouterDOM

function _Welcome({ history }) {

    return < section className="welcome" >
            <img src="assets/img/logo.png" alt="" />
        <section className="welcome-msg">
            <span>
                <h1 className="tracking-in-expand">AppDonkey<span className="rtm">®️</span>!</h1>
                <h3>Doing the donkey work for you!</h3>
                <h4>Home for your mails, home for your notes</h4>
            </span>
            <button onClick={() => history.push('/home')} className="start-btn">Make your donkey work</button>
            {/* <h3>Have some free time, beacuse we don't</h3> */}
        </section>
    </section >
}

export const Welcome = withRouter(_Welcome)
