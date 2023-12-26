import React, { useContext, useState } from "react";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import instance from "../axios/axios";

const AddForms = () => {
  const { userData } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  const fields = [
    { name: "text" },
    { name: "password" },
    { name: "radio" },
    { name: "checkbox" },
    { name: "select" },
    { name: "button" },
  ];

  let [addedFields, setAddedFields] = useState([]);
  const [allUserdata, setAllUserdata] = useState({});
  let [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");
  const handleSubmit = (field) => {
    setAddedFields([
      ...addedFields,
      {
        ...field,
        value: field.value,
        placeholder: "",
        label: "",
        options:
          field.name === "radio" || field.name === "select"
            ? []
            : field.options,
        edit: true,
      },
    ]);
  };
  const handleChange = (index, event) => {
    const newFields = [...addedFields];
    newFields[index][event.target.name] = event.target.value;
    setAddedFields(newFields);
  };

  const handleEdit = (index) => {
    const newFields = [...addedFields];
    newFields[index].edit = !newFields[index].edit;
    setAddedFields(newFields);
  };

  const handleDelete = (index, option) => {
    const newFields = [...addedFields];
    newFields[index].options = newFields[index].options.filter(
      (opt) => opt !== option
    );
    setAddedFields(newFields);
  };

  const handleAdd = (index, event) => {
    event.preventDefault();
    const newFields = [...addedFields];
    const newOption = event.target.newOption.value;
    if (!newFields[index].options.includes(newOption)) {
      newFields[index].options.push(newOption);
      setAddedFields(newFields);
    }
    event.target.reset();
  };

  const handleSubmitForm = async () => {
    if (!formName.trim()) {
      setFormNameError("Form Name is required");
      return;
    }
    setFormNameError("");

    const formData = {
      formName: formName,
      userName: userData?.firstName,
      formStructure: addedFields,
      userData: allUserdata,
    };

    try {
      await instance.post(`/form/submitform`, formData).then((response) => {
        setAddedFields([]);
        setAllUserdata({});
        if (response.data.message) {
          console.log(response.data.message);
          enqueueSnackbar(response.data.message, { variant: "success" });
        }
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.data.message) {
        console.log(error.data.message);
        enqueueSnackbar(error.data.message, { variant: "success" });
      }
    }
  };

  const deleteForm = (index) => {
    setAddedFields((prevAddedFields) => {
      const deletedFields = [...prevAddedFields];
      deletedFields.splice(index, 1);
      return deletedFields;
    });
  };

  const renderField = (field, index) => {
    switch (field.name) {
      case "text":
      case "password":
        return (
          <TextField
            type={field.name}
            value={field.value}
            onChange={(event) => handleChange(index, event)}
            placeholder={field.placeholder}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        );
      case "radio":
        return (
          <div>
            {field.options.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name="value"
                  value={option}
                  checked={field.value === option}
                  onChange={(event) => handleChange(index, event)}
                  className="form-radio"
                />
                <label htmlFor={option}>{option}</label>
                {field.edit && (
                  <Button
                    onClick={() => handleDelete(index, option)}
                    variant="contained"
                  >
                    DELETE
                  </Button>
                )}
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            name="value"
            checked={field.value}
            onChange={(event) => handleChange(index, event)}
            className="form-checkbox"
          />
        );
      case "select":
        return (
          <TextField
            select
            name="value"
            value={field.value}
            onChange={(event) => handleChange(index, event)}
            variant="outlined"
            fullWidth
            margin="normal"
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        );
      case "button":
        return <Button variant="contained">{field.value}</Button>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Paper
        elevation={3}
        className="flex flex-col items-center justify-center mt-5 "
      >
        <Typography variant="h5" gutterBottom>
          Form Builder
        </Typography>

        <Grid container spacing={2} className=" flex md:flex-row p-10">
          <div>
            <TextField
              label="Form name"
              variant="outlined"
              margin="normal"
              onChange={(event) => setFormName(event.target.value)}
              value={formName}
              error={Boolean(formNameError)}
              helperText={formNameError}
            />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 150 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Input Type</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={index}>
                      <TableCell>{field.name}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleSubmit(field)}
                          variant="contained"
                          color="secondary"
                        >
                          ADD
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div>
              <Button
                onClick={handleSubmitForm}
                variant="contained"
                color="primary"
                style={{ margin: 20 }}
              >
                Submit Form
              </Button>
              <Button
                variant="contained"
                color="success"
                LinkComponent={Link}
                to="/formtable"
                style={{ margin: 20 }}
              >
                View Form
              </Button>
            </div>
          </div>
          <Grid item xs={6}>
            {addedFields.map((field, index) => (
              <div key={index} className="mb-4">
                {field.edit && (
                  <div>
                    {field.name && (
                      <div>
                        <label>Label:</label>
                        <TextField
                          type="text"
                          name="label"
                          value={field.label}
                          onChange={(event) => handleChange(index, event)}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        />
                      </div>
                    )}
                    {(field.name === "text" || field.name === "password") && (
                      <div>
                        <label>Placeholder:</label>
                        <TextField
                          type="text"
                          name="placeholder"
                          value={field.placeholder}
                          onChange={(event) => handleChange(index, event)}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                        />
                      </div>
                    )}
                    {(field.name === "radio" || field.name === "select") && (
                      <div>
                        <label>Options:</label>
                        <form onSubmit={(event) => handleAdd(index, event)}>
                          <TextField
                            type="text"
                            name="newOption"
                            placeholder="Enter a new option"
                            variant="outlined"
                            color="secondary"
                            fullWidth="md"
                            margin="normal"
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            className="m-2"
                          >
                            ADD
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                )}
                {field.label && <label>{field.label} : </label>}
                {renderField(field, index)}
                <Button
                  onClick={() => handleEdit(index)}
                  variant="contained"
                  color="secondary"
                  className="m-2"
                  style={{ marginLeft: 10 }}
                >
                  {field.edit ? "SAVE" : "EDIT"}
                </Button>
                <Button
                  onClick={() => deleteForm(index)}
                  variant="contained"
                  className="m-2"
                  color="error"
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddForms;
