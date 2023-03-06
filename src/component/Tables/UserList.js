// // import React, { useState, useEffect } from "react";
// // import { DataTable } from "primereact/datatable";
// // import { Column } from "primereact/column";
// // import { Dropdown } from "primereact/dropdown";
// // import { InputText } from "primereact/inputtext";
// // import { ToastContainer, toast } from 'react-toastify';
// // import { confirmAlert } from "react-confirm-alert";
// // import { Button } from "primereact/button";
// // import "./ListCustomer.css";
// // import Api from "../../Api";

// // const UserList = () => {
// //   const [customerList, setCustomerList] = useState([]);
// //   const [first, setFirst] = useState(0);
// //   const [rows, setRows] = useState(10);
// //   const [globalFilterValue1, setGlobalFilterValue1] = useState("");
// //   const [filters, setFilters] = useState(null);
// //   const [selectedStatus, setSelectedStatus] = useState([]);

// //   useEffect(() => {
// //     getUser();
// //   }, []);

// //   const getUser = async () => {
// //     await Api.get(`addUser/getUser`).then((resp) => {
// //       setCustomerList(resp.data.data);
// //     });
// //   };

// //   const deleteUserdata = async (clickedUser) => {
// //     await Api.delete(`addUser/deleteUser/${clickedUser}`).then((resp) => {
// //       console.log(clickedUser.id)
// //       if (resp.status === 200){
// //         toast.success("Customer Deleted Successfully!");
// //       }
// //       return setCustomerList.filter((user)=> user._id !== clickedUser.id);
// //     });
// //   };

// //   const onCustomPage = (event) => {
// //     setFirst(event.first);
// //     setRows(event.rows);
// //   };

// //   const status = [
// //     { id: "1", name: "Active" },
// //     { id: "2", name: "Deactive" },
// //   ];

// //   const template = {
// //     layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
// //     RowsPerPageDropdown: (options) => {
// //       const dropdownOptions = [
// //         { label: 10, value: 10 },
// //         { label: 20, value: 20 },
// //         { label: 50, value: 50 },
// //       ];

// //       return (
// //         <React.Fragment>
// //           <span
// //             className="mx-1"
// //             style={{ color: "var(--text-color)", userSelect: "none" }}
// //           >
// //             Items per page:{" "}
// //           </span>
// //           <Dropdown
// //             value={options.value}
// //             options={dropdownOptions}
// //             onChange={options.onChange}
// //           />
// //         </React.Fragment>
// //       );
// //     },
// //     CurrentPageReport: (options) => {
// //       return (
// //         <span
// //           style={{
// //             color: "var(--text-color)",
// //             userSelect: "none",
// //             width: "120px",
// //             textAlign: "center",
// //             alignItems: "center",
// //           }}
// //         >
// //           {options.first} - {options.last} of {options.totalRecords}
// //         </span>
// //       );
// //     },
// //   };

// //   const onGlobalFilterChange1 = (e) => {
// //     const value = e.target.value;
// //     let _filters = { ...filters };
// //     _filters["global"].value = value;

// //     setFilters(_filters);
// //     setGlobalFilterValue1(value);
// //   };

// //   const renderHeader = () => {
// //     return (
// //       <div className="flex justify-content-end">
// //         <span className="p-input-icon-left">
// //           <i className="pi pi-search" />
// //           <InputText
// //             value={globalFilterValue1}
// //             onChange={onGlobalFilterChange1}
// //             placeholder="Keyword Search"
// //           />
// //         </span>
// //       </div>
// //     );
// //   };

// //   const header1 = renderHeader();

// //   const statusBodyTemplate = (rowData) => {
// //     return (
// //         <Dropdown
// //           value={selectedStatus}
// //           onChange={(e) => setSelectedStatus(e.value)}
// //           options={status}
// //           optionLabel="name"
// //         />
// //     );
// //   };

// //   const submit = (_id) => {
// //     confirmAlert({
// //       title: "Delete?",
// //       message:`Are you sure you want to delete ${_id.username}`,
// //       buttons: [
// //         {
// //           label: "Yes",
// //           onClick: () => {
// //             deleteUserdata(_id);
// //           },
// //         },
// //         {
// //           label: "No",
// //         },
// //       ],
// //     });
// //   };

// //   const actionBodyTemplate = (rowData) => {
// //     return(
// //       <React.Fragment>
// //         <div className="d-flex">
// //             <Button
// //             // onClick={() => deleteRow(id)}
// //             icon="pi pi-pencil"
// //             className="p-button-rounded p-button-text font-bold"
// //             style={{ color: "green" }}
// //             aria-label="Submit"
// //           />
// //           <Button
// //             onClick={(_id) => submit(rowData._id)}
// //             icon="pi pi-trash"
// //             className="p-button-rounded p-button-text font-bold"
// //             style={{ color: "red" }}
// //             aria-label="Submit"
// //           />
// //         </div>
// //       </React.Fragment>
// //     );
// //   };

// //   return (
// //     <div className="mt-4 p-4">
// //     <ToastContainer/>
// //       <div className="card table-card mb-2 surface-0 shadow-2 p-3 border-1 border-50 border-round">
// //         <div className="pages-title mx-4 mb-3">List User</div>
// //         <DataTable
// //           className="mx-4"
// //           value={customerList}
// //           stripedRows
// //           paginator
// //           paginatorTemplate={template}
// //           first={first}
// //           rows={rows}
// //           onPage={onCustomPage}
// //           paginatorClassName="justify-content-end"
// //           responsiveLayout="scroll"
// //           globalFilterFields={["username", "email", "userRole", "status"]}
// //           header={header1}
// //           getRowId={(row) => row._id}
// //         >
// //           <Column field="username" header="User Name"></Column>
// //           <Column field="email" header="Email"></Column>
// //           <Column field="role" header="userRole"></Column>
// //           <Column field="status" header="Status" body={statusBodyTemplate} />
// //           <Column
// //             header="Action"
// //             headerStyle={{ width: "4rem", textAlign: "center" }}
// //             bodyStyle={{ textAlign: "center", overflow: "visible" }}
// //             body={actionBodyTemplate}
// //           />
// //         </DataTable>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserList;

// // import React, { useState, useEffect, useRef } from 'react';
// // import { DataTable } from 'primereact/datatable';
// // import { Column } from 'primereact/column';
// // import { InputText } from 'primereact/inputtext';
// // import { Dropdown } from "primereact/dropdown";
// // import {Button} from "primereact/button";
// // import './ListCustomer.css';
// // import Api from "../../Api";

// // export default function ProductTable() {
// //   const [productList, setProductList] = useState([]);
// //   const dt = useRef(null);
// //   const [globalFilter, setGlobalFilter] = useState(null);

// //     useEffect(() => {
// //         getProduct();
// //     }, []);

// //     const getProduct = async ()=>{
// //       await Api.get(`addProduct/getProduct`).then((resp)=>{
// //         setProductList(resp.data.data);
// //       })
// //     }

// //     const formatCurrency = (value) => {
// //         return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
// //     }

// //     const template = {
// //       layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
// //       RowsPerPageDropdown: (options) => {
// //         const dropdownOptions = [
// //           { label: 10, value: 10 },
// //           { label: 20, value: 20 },
// //           { label: 50, value: 50 },
// //         ];

// //         return (
// //           <React.Fragment>
// //             <span
// //               className="mx-1"
// //               style={{ color: "var(--text-color)", userSelect: "none" }}
// //             >
// //               Items per page:{" "}
// //             </span>
// //             <Dropdown
// //               value={options.value}
// //               options={dropdownOptions}
// //               onChange={options.onChange}
// //             />
// //           </React.Fragment>
// //         );
// //       },
// //       CurrentPageReport: (options) => {
// //         return (
// //           <span
// //             style={{
// //               color: "var(--text-color)",
// //               userSelect: "none",
// //               width: "120px",
// //               textAlign: "center",
// //               alignItems:"center",
// //             }}
// //           >
// //             {options.first} - {options.last} of {options.totalRecords}
// //           </span>
// //         );
// //       },
// //     };

// //     const imageBodyTemplate = (rowData) => {
// //         return <img src={`${rowData.ProductImage}`} alt={rowData.ProductImage} className="product-image" />;
// //     }

// //     const priceBodyTemplate = (rowData) => {
// //         return formatCurrency(rowData.price);
// //     }

// //     const statusBodyTemplate = (rowData) => {
// //         return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
// //     }

// //     const actionBodyTemplate = (rowData) => {
// //       return (
// //           <React.Fragment>
// //           <div className='d-flex'>
// //               <Button
// //                     // onClick={() => editRow(id)}
// //                     icon="pi pi-pencil"
// //                     className="p-button-rounded p-button-text font-bold"
// //                     style={{ color: "green" }}
// //                     aria-label="Submit"
// //                     />
// //                     <Button
// //                       // onClick={() => deleteRow(id)}
// //                       icon="pi pi-trash"
// //                       className="p-button-rounded p-button-text font-bold"
// //                       style={{ color: "red" }}
// //                       aria-label="Submit"
// //                     />
// //                     </div>
// //           </React.Fragment>
// //       );
// //   }

// //   const renderHeader = () => {
// //     return (
// //         <div className="table-header">
// //             <span className="p-input-icon-left">
// //                 <i className="pi pi-search" />
// //                 <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
// //             </span>
// //         </div>
// //     );
// // }

// // const header = renderHeader();

// //     return (
// //       <div className="mt-4 p-4">
// //       <div className="card table-card mb-2 surface-0 shadow-2 p-3 border-1 border-50 border-round">
// //         <div className="pages-title mx-2 mb-3">List Product</div>
// //                 <DataTable header={header} ref={dt} value={productList} paginator
// //                     paginatorTemplate={template} responsiveLayout="scroll" globalFilter={globalFilter}>
// //                     <Column field="name" header="Name"></Column>
// //                     <Column header="ProductImage" body={imageBodyTemplate}></Column>
// //                     <Column field="price" header="Price" body={priceBodyTemplate}></Column>
// //                     <Column field="description" header="Description"></Column>
// //                     <Column header="Status" body={statusBodyTemplate}></Column>
// //                     <Column header="Action" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
// //                 </DataTable>
// //             </div>
// //         </div>
// //     );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import Tooltip from "@mui/material/Tooltip";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { confirmAlert } from "react-confirm-alert";
// import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";
// import Api from "../../Api";
// import "./ListCustomer.css";
// import { Select } from "antd";

// const CustomToolbar = () => {
//   return (
//     <GridToolbarContainer className="p-px">
//       <GridToolbarExport className="bg-blue-500 text-white flex-end" />
//     </GridToolbarContainer>
//   );
// };


// const { Option } = Select;

// const ProductTable = () => {
//   const [userList, setUserList] = useState([]);

//   const toast = useRef(null);

//   useEffect(() => {
//     getProduct();
//   }, []);

//   const getProduct = async () => {
//     await Api.get(`addUser/getUser`).then((resp) => {
//       setUserList(resp.data.data);
//     });
//   };

//   const deleteUserdata = async (clickedUser) => {
//     await Api.delete(`addUser/deleteUser/${clickedUser}`).then((resp) => {
//       console.log(clickedUser.id);
//       if (resp.status === 200) {
//         toast.success("Product Deleted Successfully!");
//       }
//       return setUserList.filter((user) => user._id !== clickedUser.id);
//     });
//   };

//   const submit = (_id) => {
//     confirmAlert({
//       title: "Are You Sure",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: () => {
//             deleteUserdata(_id);
//           },
//         },
//         {
//           label: "No",
//         },
//       ],
//     });
//   };

//   const columns = [
//     { field: "username", headerName: "User Name", width: 200, height: "100%" },
//     { field: "email", headerName: "Email", width: 250, height: "100%" },

//     {
//       field: "role",
//       fieldAlign: "center",
//       headerName: "User Role",
//       headerAlign: "center",
//       type: "string",
//       width: 200,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       type: "string",
//       width: 200,
//       courser: "pointer",

//       renderCell: (params) => {
//         return(
//           <div>
//             <Select>
//               <Option value={0}>Active</Option>
//               <Option value={1}>Deactive</Option>
//             </Select>
//           </div>
//         )
//       }
//     },
//     {
//       field: "Action",
//       fieldAlign: "center",
//       headerName: "Action",
//       headerAlign: "center",
//       courser: "pointer",

//       renderCell: (params) => {
//         return (
//           <div>
//             {/* <Tooltip title="Edit">
//               <Button
//                 icon="pi pi-pencil"
//                 className="p-button-rounded p-button-text font-bold"
//                 style={{ color: "green" }}
//                 aria-label="Submit"
//                 // onClick={() => {
//                 //   setId(params.row.id);
//                 //   setcompanyname(params.row.companyname);
//                 //   setcompanyaddress(params.row.companyaddress);
//                 //   setPanNumber(params.row.PanNumber);
//                 //   setGSTNo(params.row.GSTNo);
//                 //   setcontactpersonname(params.row.contactpersonname);
//                 //   setcontactPersonnumber(params.row.contactPersonnumber);
//                 //   setpurpose(params.row.purpose);
//                 //   setprojectstatus(params.row.projectstatus);
//                 //   setdescription(params.row.description);
//                 //   // handleClickOpen();
//                 // }}
//               />
//             </Tooltip>
//             &nbsp; */}
//             <Tooltip title="Delete">
//               <Button
//                 onClick={(_id) => {
//                   submit(params.row._id);
//                 }}
//                 icon="pi pi-trash"
//                 className="p-button-rounded p-button-text font-bold"
//                 style={{ color: "red" }}
//                 aria-label="Submit"
//               />
//             </Tooltip>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="mt-4 p-4">
//       <Toast ref={toast} />
//       <div className="card table-card mb-2 surface-0 shadow-2 p-3 border-1 border-50 border-round">
//         <div className="pages-title mx-2 mb-3">User List</div>
//         <DataGrid
//           sx={{
//             border: "none",
//             "& .MuiDataGrid-cell:hover": {
//               color: "gray",
//             },
//           }}
//           rows={userList}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           checkboxSelection
//           GridPrintExportOptions
//           disableSelectionOnClick
//           experimentalFeatures={{ newEditingApi: true }}
//           getRowId={(row) => row._id}
//           autoHeight
//           components={{
//             Toolbar: CustomToolbar,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductTable;
