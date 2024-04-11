import './Pagination.css';

function Pagination({currentPage=1, maxPages=1, onGotoPageCallback}) {
    return (
        <div className="pagination">
            <p  className={`pagination-link ${currentPage <= 1 ? 'disabled' : 'enabled'}`} onClick={() => onGotoPageCallback(currentPage - 1)}>Prev</p>
            <p>{currentPage} of {maxPages}</p>
            <p className={`pagination-link ${currentPage >= maxPages ? 'disabled' : 'enabled'}`}  onClick={() => onGotoPageCallback(currentPage + 1)}>Next</p>
        </div>
    );
}

export default Pagination;