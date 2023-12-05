import { useState, useEffect } from "react";
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

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import AddForms from "./AddForms";

const FormTable = () => {
  const [user, setUser] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [visualiseData, setVisualiseData] = useState([]);
  const [formStructure, setFormStructure] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [submissions, setSubmissions] = useState([]);
  // const [formData, setFormData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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
    getFormData();
  }, []);

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
      <IconButton onClick={() => viewFormTable(params.data, params.rowIndex)}>
        <DescriptionIcon color="secondary" />
      </IconButton>
    </div>
  );

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
    console.log(visualiseData[0]);
    const { formName, userName, formStructure, _id } = visualiseData[0];

    setSubmissions((prev) => {
      const newSubmission = {
        formName: formName,
        userName: userName,
        formStructure: formStructure,
        submissions: [{ ...inputValues }],
        formSubmissionDate: new Date().toLocaleString(),
      };
      const newData = [...prev, newSubmission];

      return newData;
    });

    // setFormData(() => {
    //   const finalSubmission = {
    //     formName: formName,
    //     userName: userName,
    //     formStructure: formStructure,
    //     submissions: [...dataSubmissions],
    //     Date: date,
    //   };
    //   return finalSubmission;
    // });

    try {
      await axios.patch(`${URI}/form/updateform/${_id}`, submissions);
      console.log("Form updated successfully");
      setSelectedFormId(null);
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
