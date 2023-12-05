import React, { useState } from "react";
import { Button, TextField, Typography, Card } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { CiText } from "react-icons/ci";
import { IoMdRadioButtonOn, IoIosCheckboxOutline } from "react-icons/io";
import { GoSingleSelect } from "react-icons/go";
import { MdOutlinePassword } from "react-icons/md";

const AddForms = () => {
  const { enqueueSnackbar } = useSnackbar();

  const fields = [
    { name: "text", icon: <CiText /> },
    { name: "password", icon: <MdOutlinePassword /> },
    { name: "radio", icon: <IoMdRadioButtonOn /> },
    { name: "checkbox", icon: <IoIosCheckboxOutline /> },
    { name: "button" },
    { name: "select", icon: <GoSingleSelect /> },
  ];

  const [addedFields, setAddedFields] = useState([]);
  const [allUserdata, setAllUserdata] = useState({});
  const [formName, setFormName] = useState("");
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

  const URI = "http://localhost:4000";

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
      userName: sessionStorage.getItem("user"),
      formStructure: addedFields,
      userData: allUserdata,
    };
    console.log(formData);
    try {
      await axios.post(`${URI}/form/submitform`, formData).then((response) => {
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
                    variant="outlined"
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
      <div container className="flex p-10 justify-between">
        <div>
          <Card className="p-2 m-2">
            <TextField
              label="Form name"
              variant="outlined"
              margin="normal"
              onChange={(event) => setFormName(event.target.value)}
              value={formName}
              error={Boolean(formNameError)}
              helperText={formNameError}
            />
          </Card>
          <Card className="h-100 p-5 m-4 grid grid-rows-3 grid-flow-col  ">
            {fields.map((field, index) => (
              <div key={index} className="m-2">
                <Button
                  onClick={() => handleSubmit(field)}
                  color="primary"
                  variant="contained"
                >
                  <div className=" m-2 w-10 h-10 flex items-center justify-center flex-col ">
                    <div>{field.icon}</div>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {field.name}{" "}
                    </Typography>
                  </div>
                </Button>
              </div>
            ))}
          </Card>
        </div>

        <div item xs={6}>
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
                          fullWidth
                          margin="normal"
                        />
                        <Button type="submit" variant="outlined">
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
                variant="outlined"
                style={{ marginLeft: 10 }}
              >
                {field.edit ? "SAVE" : "EDIT"}
              </Button>
              <Button
                onClick={() => deleteForm(index)}
                variant="outlined"
                style={{ marginLeft: 10 }}
              >
                Delete
              </Button>
            </div>
          ))}
          {addedFields?.length
            ? addedFields && (
                <div>
                  {" "}
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
                    color="primary"
                    LinkComponent={Link}
                    to="/formtable"
                    style={{ margin: 20 }}
                  >
                    View Form
                  </Button>
                </div>
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default AddForms;
