import "tabulator-tables/dist/css/tabulator.min.css";
import {TabulatorFull} from "tabulator-tables"; //import Tabulator library

import React, {useEffect, useState} from "react";
import {getAllResults} from "../../../services/resultService";
import {useSelector} from 'react-redux'
import autoColumnsDefinitions from "./scripts/autoColumnDefinitions";
import makeToolTipFunction from "./scripts/tooltip";
import headerMenu from "./scripts/headerMenu";
import api from "../../../services/api";
import linkedin_logo from "../../../assets/icons8-linkedin-2.svg"
import indeed_logo from "../../../assets/icons8-indeed.svg"

const BasTabulator = ({table, setTable, setDetail, cellMenu}) => {
    const {id: userId} = useSelector(state => state.user)
    const [data, setData] = useState([])
    let tableRef = React.useRef()

    // --------------------- Display Detail -------------------
    function attachDetail(row) {
        console.log("calls attach detail---")
        const detail = {
            job_id: "",
            description: "",
            company_homepage_url: "",
            job_url: "",
            title: "",
            company_name: "",
            boardLogo: "",
        }
        detail.job_id = row.getData().job_id
        detail.description = row.getData().job_description_html
        detail.company_homepage_url = row.getData().company_homepage_url
        if (detail.company_homepage_url?.toLowerCase().startsWith('www')) {
            detail.company_homepage_url = `http://${detail.company_homepage_url}`
        }
        detail.job_url = row.getData().job_url
        detail.title = row.getData().job_title
        detail.company_name = row.getData().company_name
        if (detail.job_url.includes('indeed')) {
            detail.boardLogo = indeed_logo
        } else if (detail.job_url.includes('linkedin')) {
            detail.boardLogo = linkedin_logo
        }
        setDetail(detail)
    }


    // -------------------------------------------
    const tableConfig = {
        maxHeight: "80vh",
        index: "job_id", //set the index field
        data: data,
        autoColumns: true,  // automatically make columns structure by examining the first row of the table.
        autoColumnsDefinitions: autoColumnsDefinitions,
        resizableColumnFit: false,
        debugInvalidOptions: false,
        history: true,
        layout: "fitColumns",  //  the table will resize columns so that they fit inside the width of the container.
        movableColumns: true,
        persistence: true, //enable table persistence
        persistenceMode: "local", //store persistence information in local storage
        clipboard: true, //enable clipboard functionality
        responsiveLayout: "collapse", // collapse columns that no longer fit on the table into a list under the row
        selectable: true,  // enable row selection
        validationMode: "manual", // no validation is automatically performed on edit
        columnDefaults: {
            tooltip: makeToolTipFunction(),
            editor: "input",
            headerMenu: headerMenu,
            resizable: 'header',
            headerTooltip: true,
            download: true,  // include hidden columns in the download
            contextMenu: cellMenu,
        },
    }

    useEffect(() => {
        getAllResults().then(data => {
            setData(data)
        }).catch(e => console.log(e))
    }, [])

    useEffect(() => {
        const aTable = new TabulatorFull(tableRef, tableConfig)
        let currentRowElement;

        function highlightCurrentRowElement(row) {
            if (currentRowElement) {
                currentRowElement.classList.remove('current-row')
            }
            currentRowElement = row.getElement()
            currentRowElement.classList.add('current-row')
        }

        aTable.on('rowClick', function (e, row) {
            attachDetail(row)
            highlightCurrentRowElement(row)
        })

        aTable.on("cellEditing", function (cell) {
            const row = cell.getRow()
            attachDetail(row)
            highlightCurrentRowElement(row)
        });

        aTable.on('cellEdited', function (cell) {
            const job_id = cell.getRow().getData().job_id
            const oldValue = cell.getOldValue()
            const newValue = cell.getValue()
            if (
                ([null, ""].includes(oldValue) && [null, ""].includes(newValue))
                || oldValue?.toString().trim() === newValue?.toString().trim()) {  // no change in cell value
                return
            }
            console.log("updating", JSON.stringify(oldValue), typeof oldValue, "=>", JSON.stringify(newValue), typeof newValue)
            const column = cell.getField()
            const recordToSend = {
                job_id,
                [column]: newValue
            }
            if (!recordToSend.job_id) {
                return
            }
            // TODO this causes the table to crash often, because it resets data while editing
            api.put('/job', recordToSend)
                .then(res => {
                    aTable.setData(res.data);
                    // restoreColumnLayout()
                })
                .catch(e => console.log(e))

        })
        setTable(aTable)
    }, [data])


    return <div ref={r => (tableRef = r)}/>
}

export default BasTabulator