import * as React from "react";
import {useEffect, useState} from "react";
import axios from 'axios'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import './order.styles.scss'
import ClearIcon from '@mui/icons-material/Clear';
import {Checkbox, IconButton} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Drawer from "@mui/material/Drawer";
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";


export const Orders = () => {

    const [defaultColumns] = useState(['Order ID', 'Date and Time', "Price"]);
    const [selectedColumns, setSelectedColumns] = useState([...defaultColumns]);
    const columns = ["Order ID", "Date and Time", "Order Status", "Price", "Quantity"];
    const [isOrderListLoading, setIsOrderListLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [isSidebarOpened, setIsSidebarOpened] = React.useState(false);

    const handleColumnSelect = (e, column) => {
        let existingSelectedColumns = [...selectedColumns];
        if (e.target.checked) {
            existingSelectedColumns.push(column);
        } else {
            existingSelectedColumns = existingSelectedColumns.filter(item => item !== column);
        }
        setSelectedColumns(existingSelectedColumns);
        console.log("final selected column", existingSelectedColumns);
    };

    const getOrders = () => {
        setIsOrderListLoading(true);
        axios.get(" http://localhost:8080/orders")
            .then(res => {
                setOrderList(res.data);
                setIsOrderListLoading(false);
            })
            .catch(err => {
                setOrderList([]);
                setIsOrderListLoading(false);
            });
    }


    useEffect(() => {
        getOrders();
    }, []);

    const openSideBar = () => {
        setIsSidebarOpened(true);
    };

    const closeSideBar = () => {
        setIsSidebarOpened(false);
    };

    return (
        <>
            <div className={'orders-component'}>
                <div className={"order-list-container"}>
                    <div className={"order-list-header"}>
                        <div className='order-list-title'>
                            ORDERS
                        </div>
                        <div className='order-list-options'>
                            <IconButton onClick={openSideBar}>{<FilterAltIcon/>}</IconButton>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        {isOrderListLoading && <LinearProgress/>}
                        <Table sx={{minWidth: 350}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                        selectedColumns.map((column) => {
                                            return <TableCell key={column} align="center">{column}</TableCell>
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderList?.map((e => {
                                    return (
                                        <TableRow className={e.orderStatus.toLowerCase().split(' ')
                                            .join('_')} key={e.id}>
                                            {selectedColumns.includes('Order ID') &&
                                                <TableCell align="center">{e.orderId}</TableCell>}
                                            {selectedColumns.includes('Date and Time') &&
                                                <TableCell align="center">{e.createdAt}{moment().format('DD-MM-YYYY hh:mm a')}</TableCell>}
                                            {selectedColumns.includes('Order Status') &&
                                                <TableCell align="center">{e.orderStatus}</TableCell>}
                                            {selectedColumns.includes('Price') &&
                                                <TableCell align="center">{e.orderPrice}</TableCell>}
                                            {selectedColumns.includes('Quantity') &&
                                                <TableCell align="center">{e.noOfItems}</TableCell>}
                                        </TableRow>
                                    )
                                }))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <Drawer
                        anchor={"right"}
                        open={isSidebarOpened}
                        onClose={openSideBar}
                        className={"drawer"}
                        variant={"persistent"}
                    >
                        <div className={"drawer-container"}>
                            <div className={"drawer-header"}>
                                <div className="drawer-title">
                                    Column Settings
                                </div>
                                <div className={"drawer-options"}>
                                    <IconButton onClick={closeSideBar}>
                                        {<ClearIcon/>}
                                    </IconButton>
                                </div>
                            </div>
                            <div className="drawer-body">
                                <div className="column-list">

                                    {
                                        columns.map((column) => {
                                            return (<div className={"column-item"} key={column}>
                                                    <FormControlLabel
                                                        control={<Checkbox
                                                        checked={selectedColumns.includes(column)}
                                                        disabled={defaultColumns.includes(column)}
                                                        onChange={(e) => {
                                                        handleColumnSelect(e, column)
                                                    }}/>} label={column}/>
                                            </div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Drawer>
                </div>
            </div>
        </>
    )
}