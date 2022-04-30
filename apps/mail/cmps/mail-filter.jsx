export function MailFilter({ handleFilterChange, inputTxt, onSort }) {
    return <form className="filter-container " onSubmit={handleFilterChange}>
        <div className="search-bar">
            <button></button>
            <input type="text" onChange={handleFilterChange} name="txt" value={inputTxt}
                autoComplete="off" placeholder="Search mail" />
        </div>
        <div className="sorting-tools flex">
            <button className="sort-btn subject" name={'subject'} onClick={(ev) => {
                ev.preventDefault()
                onSort(ev)
            }}>Subject</button>
            <button className="sort-btn date" name={'sentAt'} onClick={(ev) => {
                ev.preventDefault()
                onSort(ev)
            }}>Date</button>
        </div>
    </form>
}