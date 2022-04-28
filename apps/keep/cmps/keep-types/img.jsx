export function Img({ keep }) {
    return <div className="keep-img">
        <img src={keep.info.url} />
    </div>
}