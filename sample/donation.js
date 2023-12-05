// Import necessary dependencies
import React, { useContext, useState } from "react";
import {
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
  Button,
  Card,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import UserContext from "../context/UserContext";

const CircularIndeterminate = () => {
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};

const step1 = () => {};

// Main Form Component
const DonationScreen = () => {
  const [open, setOpen] = React.useState(false);
  const { userData } = useContext(UserContext);
  // const [landmarks, setLandmarks] = useState([]);

  // const handleLandmarkChange = (_, value) => {
  //   setFormData((prev) => ({ ...prev, Landmark: value }));
  //   setErrors((prev) => ({ ...prev, Landmark: "" }));
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { getLoggedIn } = useContext(AuthContext);
  const [village, setVillage] = useState();
  const initialState = {
    name: userData.name,
    email: userData.email,
    pincode: "",
    phone: "",
    Country: "",
    State: "",
    District: "",
    Taluk: "",
    Village: "",
    // Landmark: "",
    deliveryDate: "",
    deliveryTime: "",
    expiryDate: "",
    notes: "",
    acknowledgement: false,
  };
  const [formData, setFormData] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    pincode: "",
    phone: "",
    Village: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, value) => {
    setFormData((prev) => ({ ...prev, Village: value }));
    setErrors((prev) => ({ ...prev, Village: "" }));
  };

  const handleFetchDetails = async () => {
    setLoading(true);

    try {
      const pincode = formData.pincode;
      if (pincode) {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = await response.json();

        const postOffices = data[0]?.PostOffice;

        const postOfficeData = [...postOffices];

        const postOfficeNamesArray = postOfficeData.length
          ? postOfficeData.map((x) => x.Name)
          : ["No names available"];

        setVillage({
          Country: data[0]?.PostOffice[0]?.Country || "",
          State: data[0]?.PostOffice[0]?.State || "",
          District: data[0]?.PostOffice[0]?.District || "",
          Taluk: data[0]?.PostOffice[0]?.Block || "",
          Pincode: data[0]?.PostOffice[0]?.Pincode || "",
          village: postOfficeNamesArray,
        });
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(village);
  const navigate = useNavigate();

  const SERVER_PORT = "http://localhost:4000";

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      pincode: "",
      phone: "",
      Village: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pin code is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.Village.trim()) {
      newErrors.Village = "Village is required";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((val) => val === "");
  };

  // const getGeoCodes = async () => {
  //   const apiKey = process.env.REACT_APP_OPEN_CAGE_API;
  //   const postalOfficePlace = formData?.Village;
  //   const taluk = village?.Taluk;
  //   const district = village?.District;
  //   const state = village?.State;
  //   const country = village?.Country;

  //   const address = `${postalOfficePlace}, ${taluk}, ${district}, ${state}, ${country}`;

  //   const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
  //     address
  //   )}&key=${apiKey}`;

  //   try {
  //     const response = await axios.get(apiUrl);
  //     const results = response.data.results;

  //     if (results.length > 0) {
  //       const firstResult = results[0];
  //       const { formatted, geometry } = firstResult;

  //       console.log("Formatted Address:", formatted);
  //       console.log("Latitude:", geometry.lat);
  //       console.log("Longitude:", geometry.lng);

  //       setVillage({
  //         Address: formatted,
  //         latitude: Number(geometry.lat),
  //         longitude: Number(geometry.lng),
  //       });
  //     } else {
  //       console.log("No results found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geocoding data:", error.message);
  //   }
  // };
  // const getLandmark = (query) => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization: "fsq3QhpFK4rvOtKusVwBKgt3slZMCsEU1cBgvIA/ot1BrPw=",
  //     },
  //   };

  //   fetch(
  //     `https://api.foursquare.com/v3/autocomplete?query=${query}&ll=${village.latitude}%2C${village.longitude}&limit=50&radius=10000`,
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response.results);
  //       const oldArray = response.results;

  //       // Filter out undefined values and get the place names
  //       const landmarksArray = oldArray
  //         .filter((result) => result?.place?.name !== undefined)
  //         .map((result) => {
  //           const place = result?.place;
  //           return `${place.name} - ${place.categories[0]?.name || ""}-${
  //             place?.location?.address
  //           }`;
  //         });

  //       console.log(landmarksArray);

  //       setLandmarks(landmarksArray || []);
  //     })
  //     .catch((err) => console.error(err));
  // };

  // React.useEffect(() => {
  //   if (village?.latitude !== "" && village.longitude !== "") {
  //     getLandmark();
  //   }
  // }, []);

  const handleSubmit = async () => {
    // Validate the form
    if (!validateForm()) {
      enqueueSnackbar("Please fill all required fields", { variant: "error" });
      return;
    }

    // Validate Villages Autocomplete
    if (formData.Village.trim() === "" || userData?.village.length === 0) {
      setErrors((prev) => ({ ...prev, Village: "Village is required" }));
      return;
    }

    try {
      setLoading(true);
      handleClickOpen();
      console.log("Form submitted:", formData);
      await axios
        .post(`${SERVER_PORT}/createUser`)
        .then((response) => {
          console.log(response.data);
          if (response.data.message) {
            console.log(response.data.message);
            enqueueSnackbar(response.data.message, { variant: "success" });
          }
          handleClose();
          setFormData(initialState);
          getLoggedIn();
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        console.log(err.response.data.message);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        handleClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-2 flex justify-center m-4  items-center h-[100vh]">
        <Card className="flex p-10">
          <div className="m-2 w-[30%]">
            <TextField
              label="Food Availbale Pincode"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
              variant="standard"
              margin="normal"
              name="pincode"
              error={!!errors.pincode}
              helperText={errors.pincode}
              required
            />
            <TextField
              label="Alternate Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="standard"
              onClick={handleFetchDetails}
              name="phone"
              error={!!errors.phone}
              helperText={errors.phone}
              required
              type="tel"
            />
            <Autocomplete
              disablePortal
              options={village?.village || []}
              name="Villages"
              fullWidth
              variant="standard"
              isOptionEqualToValue={(option, value) =>
                option.valueOf === value.valueOf
              }
              sx={{ marginTop: 2 }}
              value={formData.Village}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your nearby village"
                  error={!!errors.Village}
                  helperText={errors.Village}
                  required
                />
              )}
              onChange={(e, value) => handleAutocompleteChange(e, value)}
              required
            />

            <FormControl margin="dense">
              <FormLabel id="demo-radio-buttons-group-label">
                Food Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Veg"
                name="Veg"
                onChange={(e) => handleChange(e)}
                value={formData.gender}
              >
                <FormControlLabel
                  value="Non-Veg"
                  control={<Radio />}
                  label="Non-Veg"
                />
                <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
                <FormControlLabel
                  value="Both"
                  control={<Radio />}
                  label="Both"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="w-[30%] m-2">
            <TextField
              label="Preferred Delivery Date"
              value={formData.deliveryDate}
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: { position: "absolute", top: -2 },
              }}
              name="deliveryDate"
              onChange={(e) => handleChange(e)}
              margin="dense"
            />
            <TextField
              value={formData.deliveryTime}
              label="Preferred Delivery Time"
              type="time"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: { position: "absolute", top: -2 },
              }}
              name="deliveryTime"
              onChange={(e) => handleChange(e)}
              margin="dense"
            />
            <TextField
              label="expiryDate"
              value={formData.expiryDate}
              type="date"
              fullWidth
              name="expiryDate"
              margin="normal"
              InputLabelProps={{
                shrink: true,
                style: { position: "absolute", top: -2 },
              }}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <TextField
            label="Mention the landmark of the Available Donation"
            multiline
            rows={4}
            name="notes"
            variant="outlined"
            value={formData.notes}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="acknowledgement"
                  checked={formData.acknowledgement}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  color="success"
                  type="checkbox"
                />
              }
              label="I agree to accept the Terms and Conditions"
            />
          </FormGroup>
          {/* <Autocomplete
              disablePortal
              onInputChange={(e, newInputValue) => getLandmark(newInputValue)}
              options={landmarks}
              name="Landmarks"
              fullWidth
              variant="standard"
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              sx={{ marginTop: 2 }}
              value={formData.Landmark}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Mention Food Location"
                  error={!!errors.Landmark}
                  helperText={errors.Landmark}
                  required
                />
              )}
              onChange={handleLandmarkChange}
              required
            /> */}

          <Button onClick={handleSubmit}>Submit</Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              {loading && <CircularIndeterminate />}
              <DialogContentText>Loading</DialogContentText>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </div>
  );
};

export default DonationScreen;
