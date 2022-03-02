import React from "react";
import PropTypes from "prop-types";
// @mui
import TableRow from "@mui/material/TableRow";
import TableFoot from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

// ---------------------------------------------------------------------------------------------------------------------

TableFooter.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  paginationCount: PropTypes.number.isRequired
};

// ---------------------------------------------------------------------------------------------------------------------

export default function TableFooter(props) {
  const {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    paginationCount
  } = props;

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, page) => setPage(page);

  return (
    <TableFoot>
      <TableRow>
        <TablePagination
          page={page}
          count={paginationCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Элементов на странице"
          rowsPerPageOptions={[10, 15, 25]}
        />
      </TableRow>
    </TableFoot>
  )
}
