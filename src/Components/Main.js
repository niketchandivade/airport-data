import React, { useState } from "react";
import Header from "./Header";
import { data } from "../data/airports.js";
import useTable from "./useTable";
import Checkbox from "./Checkbox";
import "../styles/Main.css";

//icon import
import SearchIcon from "@material-ui/icons/Search";

export default function Main() {
    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = (event) => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked,
        });
    };

    const checkboxes = [
        {
            name: "small",
            key: "small",
            label: "Small",
        },
        {
            name: "medium",
            key: "medium",
            label: "Medium",
        },
        {
            name: "large",
            key: "large",
            label: "Large",
        },
        {
            name: "heliport",
            key: "heliport",
            label: "Heliport",
        },
        {
            name: "closed",
            key: "closed",
            label: "Closed",
        },
    ];

    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const headCells = [
        { id: "name", label: "Name", align: "center" },
        { id: "icao", label: "ICAO", align: "center" },
        { id: "iata", label: "IATA", align: "center" },
        { id: "elevation", label: "Elev.", align: "center" },
        { id: "latitude", label: "Lat.", align: "center" },
        { id: "longitude", label: "Long.", align: "center" },
        { id: "type", label: "Type", align: "center" },
    ];

    const {
        Table,
        Tableheader,
        TablePagination,
        recordsAfterFiltering,
    } = useTable(data, headCells, filterFn, checkedItems);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: (items) => {
                if (target.value == "") {
                    return items;
                } else {
                    return items.filter(
                        (x) =>
                            x.name.toLowerCase().includes(target.value) ||
                            x.icao.toLowerCase().includes(target.value) ||
                            x.elevation.toString().includes(target.value) ||
                            x.latitude.toString().includes(target.value) ||
                            x.longitude.toString().includes(target.value) ||
                            x.type.toLowerCase().includes(target.value)
                    );
                }
            },
        });
    };

    return (
        <>
            <Header name="FILTER AIRPORTS ASSIGNMENT" />
            <div className="menu">
                <div className="value-filter">
                    {checkboxes.map((item) => (
                        <label key={item.key} className="Checkbox">
                            <Checkbox
                                name={item.name}
                                checked={checkedItems[item.name]}
                                onChange={handleChange}
                            />
                            {item.label}
                        </label>
                    ))}
                </div>
                <div className="search">
                    <label>
                        <SearchIcon fontSize="large" className="search-icon" />
                        <input
                            type="text"
                            className="input-text"
                            name="search"
                            onChange={handleSearch}
                        />
                    </label>
                </div>
            </div>
            <Table>
                <Tableheader />
                <tbody>
                    {recordsAfterFiltering().map((record) => (
                        <tr key={record.id}>
                            <td>{record.name}</td>
                            <td className="align-center">{record.icao}</td>
                            <td className="align-center">{record.iata}</td>
                            <td className="align-center">{record.elevation}</td>
                            <td className="align-center">{record.latitude}</td>
                            <td className="align-center">{record.longitude}</td>
                            <td className="align-center">{record.type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <TablePagination />
        </>
    );
}
