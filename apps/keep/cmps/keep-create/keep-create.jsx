const { Route, NavLink } = ReactRouterDOM



export class KeepCreate extends React.Component {
    state = {
        type: 'keep-txt',
        placeholder: 'Create a new keep'

    }



    render() {
        const { placeholder } = this.state
        return <section className="keep-create flex space-between">
            <input className="input" type="text" placeholder={placeholder} />
            {/* <_DynamicCmp /> */}



        </section>
    }
}


// function _DynamicCmp() {
//     // console.log(type);
//     switch (this.state.type) {
//         case 'keep-txt':
//             return <Txt keep={keep} />
//         case 'keep-img':
//             return <Img keep={keep} />
//         case 'keep-todos':
//             return <Todos keep={keep} />
//         case 'keep-video':
//             return <Video keep={keep} />
//         default: <React.Fragment></React.Fragment>
//     }
// }





// const { placeholder } = this.state
//         return <form className="keep-create flex space-between align-center">
//             <input className="input" type="text" placeholder={placeholder} />
//             <div className="keep-type flex">
//                 <button>TXT</button>
//                 <button>IMG</button>
//                 <button>TD</button>
//                 <button>YT</button>
//             </div>
//         </form>