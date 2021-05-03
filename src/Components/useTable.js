import React, { useState } from "react";
import "../styles/UseTable.css";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import Button from "./Button";

export default function useTable(data, headCells, filterFn, checkedItems) {
    const pages = [4, 6, 8];

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const airportData = data || [];

    const Table = (props) => <table className="table">{props.children}</table>;

    const Tableheader = () => (
        <thead>
            <tr>
                {headCells.map((headCell) => (
                    <th key={headCell.id}>{headCell.label}</th>
                ))}
            </tr>
        </thead>
    );

    const TablePagination = () => (
        <div className="footer">
            <div className="rows-per-page">
                <label>
                    Rows Per Page :
                    <select
                        className="select"
                        value={rowsPerPage}
                        onChange={handleRowsPerPage}
                    >
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                    </select>
                </label>
            </div>
            <div className="next-prev">
                <div className="pagination-container">
                    <span className="page">Page : {page + 1}</span>
                    <Button onClick={handleChangePagePrevious}>
                        <NavigateBeforeIcon fontSize="small" />
                    </Button>
                    <Button onClick={handleChangePageNext}>
                        <NavigateNextIcon fontSize="small" />
                    </Button>
                </div>
            </div>
        </div>
    );

    const getTypeFilterArray = (checkedItems) => {
        const types = [];
        for (const type in checkedItems) {
            if (checkedItems[type]) {
                types.push(type);
            }
        }
        return types;
    };

    const handleChangePagePrevious = () => {
        if (page != 0) {
            setPage(page - 1);
        }
    };

    const handleChangePageNext = () => {
        setPage(page + 1);
    };

    const handleRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const recordsAfterFiltering = () => {
        const types = getTypeFilterArray(checkedItems);
        if (types.length) {
            const filteredData = filterFn
                .fn(airportData)
                .filter((data) => types.includes(data.type));
            return filteredData.slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage
            );
        } else {
            const filteredData = filterFn.fn(airportData);
            return filteredData.slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage
            );
        }
    };

    return {
        Table,
        Tableheader,
        TablePagination,
        recordsAfterFiltering,
    };
}
