const { withRouter } = ReactRouterDOM

function _Welcome({ history }) {

    return < section className="welcome" >
        <section className="welcome-msg">
            <img src="assets/img/logo.png" alt="" />
            <h1>AppDonkey!<span className="rtm">®️</span></h1>
            <h3>כי כל אחד צריך חמור עבודה לצידו</h3>
            {/* <h3>Have some free time, beacuse we don't</h3> */}
            <button onClick={() => history.push('/home')} className="start-btn">Make your donkey work</button>
        </section>
    </section >
}

export const Welcome = withRouter(_Welcome)
