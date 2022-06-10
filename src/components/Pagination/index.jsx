import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss'

const Pagination = ({onChangePage, currentPage}) => {
  return (
    <ReactPaginate
        className={style.paginate}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
