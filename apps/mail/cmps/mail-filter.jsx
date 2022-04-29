export function MailFilter({ handleFilterChange, inputTxt }) {
    return <form className="filter-container " onSubmit={handleFilterChange}>
        <input type="text" onChange={handleFilterChange} name="txt" value={inputTxt}
            className="search-bar" autoComplete="off" placeholder="Search mail" />
        <div className="sorting-tools flex">
            <button className="sort-btn subject">Subject</button>
            <button className="sort-btn date">Date</button>
        </div>
    </form>
}