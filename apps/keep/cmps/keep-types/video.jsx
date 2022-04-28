export function Video({ keep }) {
    return <div className="keep-video">
        <iframe src={keep.url} title="description"></iframe>
    </div>
}