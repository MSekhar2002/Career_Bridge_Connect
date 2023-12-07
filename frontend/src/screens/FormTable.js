import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DescriptionIcon from "@mui/icons-material/Description";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import AddForms from "./AddForms";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FormTable = () => {
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [visualiseData, setVisualiseData] = useState([]);
  const [formStructure, setFormStructure] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [viewSubmissions, setViewSubmissions] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { loggedIn } = useContext(AuthContext);

  //dialog 1 for visualise
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  // dialog 2 for edit
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  //dialog for submissions
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const descriptionElementRef = useRef(null);

  const handleClickSubmissionsOpen = (scrollType) => {
    setSubmissionsOpen(true);
    setScroll(scrollType);
  };

  const handleSubmissionsClose = () => {
    setSubmissionsOpen(false);
  };

  const URI = "http://localhost:4000";

  const getFormData = async () => {
    try {
      const response = await axios.get(`${URI}/form/getform`);
      const { data } = response.data || {};
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (loggedIn === true) {
      getFormData();
    }
  }, [loggedIn]);

  const viewRenderer = (params) => (
    <div>
      <IconButton onClick={() => viewFormTable(params.data, params.rowIndex)}>
        <RemoveRedEyeIcon color="action" />
      </IconButton>
    </div>
  );

  const editRenderer = (params) => (
    <div>
      <IconButton onClick={() => handleUpdate(params.data, params.rowIndex)}>
        <EditIcon color="primary" />
      </IconButton>
    </div>
  );

  const deleteRenderer = (params) => (
    <div>
      <IconButton onClick={() => handleDelete(params.data._id)}>
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  );
  const submissionsRenderer = (params) => (
    <div>
      <IconButton onClick={() => getSubmissions(params.data)}>
        <DescriptionIcon color="secondary" />
      </IconButton>
    </div>
  );

  const getSubmissions = (data) => {
    handleClickSubmissionsOpen("paper");
    const { submissions } = data || {};
    const getSubmission = submissions;

    setViewSubmissions(() => {
      return getSubmission;
    });
  };

  const columnDefs = [
    { field: "formName", headerName: "Form Name" },
    { field: "userName", headerName: "User Name" },
    { field: "date", headerName: "Date" },
    { headerName: "Visualise", cellRenderer: viewRenderer },
    { headerName: "Edit", cellRenderer: editRenderer },
    { headerName: "Delete", cellRenderer: deleteRenderer },
    { headerName: "Submissions", cellRenderer: submissionsRenderer },
  ];

  const viewFormTable = (data) => {
    handleClickOpen1();
    const { formStructure } = data;
    const initialState = formStructure.reduce((acc, property) => {
      acc[property.label] = "";
      return acc;
    }, {});
    setVisualiseData([data]);
    setFormStructure(formStructure || []);
    setInputValues({});
    setInputValues(initialState);
  };

  const handleUpdate = () => {
    handleClickOpen2();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URI}/form/deleteform/${id}`);
      console.log("Form deleted successfully");
      getFormData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (property, e) => {
    const { value, checked } = e.target;

    setInputValues((prevValues) => ({
      ...prevValues,
      [property.label]: property.name === "checkbox" ? checked : value,
    }));
  };

  const handleVisualiseFormSubmit = async () => {
    console.log("Entered Values:", inputValues);

    try {
      const { formName, formStructure, _id } = visualiseData[0];

      const newSubmission = {
        formName: formName,
        submittedBy: userData?.firstName,
        formStructure: formStructure,
        date: new Date().toLocaleString(),
        data: inputValues,
        ...submissions,
      };

      await axios
        .post(`${URI}/form/addsubmission/${_id}`, {
          submissions: newSubmission,
        })
        .then((response) => {
          console.log(response);
          const { submissions } = response.data || {};
          if (submissions) {
            setSubmissions((prev) => [newSubmission, ...prev]);
          }
        });

      console.log("Form updated successfully");
      setSelectedFormId(null);
      handleClose1();
      getFormData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end m-5">
        <Button variant="contained" LinkComponent={Link} to="/addforms">
          Add Forms
        </Button>
      </div>
      <Dialog open={open1} onClose={handleClose1}>
        {visualiseData.length > 0 ? (
          visualiseData.map((userData, index) => (
            <div className="p-5" key={index}>
              <DialogTitle>View Form </DialogTitle>
              <div className="m-2 font-semibold">
                Form Name:
                <span className="text-blue-500 mx-2">{userData.formName}</span>
              </div>
              <div className="m-2 font-semibold">
                Created by:
                <span className="text-blue-500 mx-2">{userData.userName}</span>
              </div>
              <DialogContent>
                {formStructure.length > 0 ? (
                  formStructure.map((property, propertyIndex) => (
                    <div key={propertyIndex}>
                      {property.name === "text" ||
                      property.name === "password" ? (
                        <div>
                          <TextField
                            label={property.label}
                            value={inputValues[property.label]}
                            margin="dense"
                            placeholder={property.placeholder}
                            onChange={(e) => handleInputChange(property, e)}
                            type={property.name}
                          />
                        </div>
                      ) : null}

                      {property.name === "radio" ? (
                        <div>
                          <FormControl>
                            <FormLabel>{property.label}</FormLabel>
                            <RadioGroup
                              value={inputValues[property.label]}
                              onChange={(e) => handleInputChange(property, e)}
                            >
                              {property.options.map((value, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={value}
                                  control={<Radio />}
                                  label={value}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      ) : null}

                      {property.name === "checkbox" ? (
                        <div className="my-2">
                          <InputLabel>Active status</InputLabel>
                          <div>
                            <Checkbox
                              checked={inputValues[property.label]}
                              onChange={(e) => handleInputChange(property, e)}
                              color="success"
                            />
                            <label>{property.label}</label>
                          </div>
                        </div>
                      ) : null}

                      {property.name === "select" ? (
                        <div>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              {property.label}
                            </InputLabel>
                            <Select
                              label={property.label}
                              onChange={(e) => handleInputChange(property, e)}
                              value={inputValues[property.label] || ""}
                            >
                              {property.options.map((value, index) => (
                                <MenuItem key={index} value={value}>
                                  {value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <DialogContentText>No Inputs Available</DialogContentText>
                )}
              </DialogContent>
            </div>
          ))
        ) : (
          <DialogContentText>No data available</DialogContentText>
        )}

        <DialogActions>
          <div className="flex justify-between">
            <div className="m-2">
              <Button onClick={handleClose1} variant="contained" color="error">
                Cancel
              </Button>
            </div>
            <div className="m-2">
              <Button
                onClick={(index) => handleVisualiseFormSubmit(index)}
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Edit Form </DialogTitle>
        <DialogContent>
          <AddForms />
        </DialogContent>
        <DialogActions>
          <div className="flex justify-between">
            <div className="m-2">
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </div>
            <div className="m-2">
              <Button variant="contained">Submit</Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={submissionsOpen}
        onClose={handleSubmissionsClose}
        scroll={scroll}
      >
        <DialogTitle>Submissions</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
            {viewSubmissions?.length > 0
              ? viewSubmissions.map((data, index) => (
                  <Card key={index} className="flex flex-col p-3 m-2">
                    <div className="flex">
                      <p className="font-semibold m-2">Form Name :</p>
                      <p className="m-2  text-blue-900 font-semibold ">
                        {data?.formName}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold m-2">SubmittedBy :</p>
                      <p className="m-2  text-blue-900 font-semibold ">
                        {data?.submittedBy}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-semibold m-2">Submission Date :</p>
                      <p className="m-2  text-blue-900 font-semibold ">
                        {data?.date}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold m-2">Submission Data :</p>
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 100 }}
                          aria-label="customized table"
                        >
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">
                                Label
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                Value
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.keys(data?.data).map((key) => (
                              <StyledTableRow key={key}>
                                <StyledTableCell
                                  component="th"
                                  align="center"
                                  scope="row"
                                >
                                  {key}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  {data?.data[key]}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Card>
                ))
              : null}
            <Card></Card>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmissionsClose}
            variant="contained"
            color="inherit"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div
        className="ag-theme-alpine"
        style={{ width: "max-width", height: 800, margin: "10px" }}
      >
        <AgGridReact rowData={user} columnDefs={columnDefs} />
        {selectedFormId && (
          <div>
            <h2>Edit Form</h2>
            <button onClick={() => handleUpdate(selectedFormId)}>Save</button>
            <button onClick={() => setSelectedFormId(null)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormTable;
