export function MailFilter({ handleFilterChange }) {
    return <form onSubmit={handleFilterChange}>
        <input onChange={handleFilterChange} className="search-bar" type="text" />
    </form>

}