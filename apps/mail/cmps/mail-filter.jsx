export function MailFilter({ handleFilterChange, inputTxt }) {
    return <form onSubmit={handleFilterChange}>
        <input type="text" onChange={handleFilterChange} name="txt" value={inputTxt} className="search-bar" autoComplete="off" />
    </form>

}