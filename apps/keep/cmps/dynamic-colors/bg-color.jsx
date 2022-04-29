export class BgColor extends React.Component {

    render() {
        const colors = ['#ff6961', '#ffb480', '#f8f38d', '#42d6a4', '#08cad1', '#59adf6', '#9d94ff', '#c780e8', '#000', '#fff']
        return <div className="colors-container flex align-center space-between">
            {colors.map(color => {
                // return <div style={{ backgroundColor: color }} key={color} className="color"> </div>
                return <div onClick={() => {this.props.onChangeColor(this.props.keepId, { color })}} style={{ backgroundColor: color }} key={color} className="color"> </div>
            })}
        </div>
    }

}
// export class BgColor extends React.Component {
//     render() {
//         const colors = ['#ff6961', '#ffb480', '#f8f38d', '#42d6a4', '#08cad1', '#59adf6', '#9d94ff', '#c780e8', '#000', '#fff']
//         return < div className="colors-container flex align-center space-between">
//             {colors.map(color => {
//             <div  style={{ backgroundColor: color }} key={color} className="color"></div >
//             })}
//         </div >

//     }
// }



//onClick={()=>{this.props.onChangeBg({color})}} 

