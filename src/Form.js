import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const inputStyle = {
  WebkitBoxShadow: "0 0 0 1000px inherit inset",
};

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });
  const [data, setData] = useState({ occupations: [], states: [] });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://frontend-take-home.fetchrewards.com/form"
      );
      setData(response.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post(
        "https://frontend-take-home.fetchrewards.com/form",
        values
      );
      setSuccess(true);
      setValues({
        name: "",
        email: "",
        password: "",
        occupation: "",
        state: "",
      });
    } catch (err) {
      console.log(err);
      <Alert severity="error">Please fill out all fields</Alert>;
    }
  };

  const handleChange = (ev) => {
    setValues({ ...values, [ev.target.name]: ev.target.value });
  };
  return (
    <div>
      <img src="../assets/logo.png" alt="Fetch Rewards logo"></img>
      <form onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <TextField
          sx={{ width: 300 }}
          inputProps={{ style: inputStyle }}
          required
          type="text"
          name="name"
          label="Full Name"
          onChange={handleChange}
          value={values.name}
          margin="dense"
        />
        <TextField
          sx={{ width: 300 }}
          inputProps={{ style: inputStyle }}
          required
          type="email"
          name="email"
          label="E-mail"
          onChange={handleChange}
          value={values.email}
          margin="dense"
        />
        <TextField
          sx={{ width: 300 }}
          inputProps={{ style: inputStyle }}
          required
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          margin="dense"
        />
        <FormControl
          sx={{ mt: 1, width: 300 }}
          inputProps={{ style: inputStyle }}
        >
          <InputLabel>Occupation</InputLabel>
          <Select
            required
            name="occupation"
            value={values.occupation}
            label="Occupation"
            onChange={handleChange}
          >
            {data.occupations.map((occ) => {
              return (
                <MenuItem key={occ} value={occ}>
                  {occ}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl
          sx={{ mt: 1, width: 300 }}
          inputProps={{ style: inputStyle }}
        >
          <InputLabel>State</InputLabel>
          <Select
            required
            name="state"
            value={values.state}
            label="State"
            onChange={handleChange}
          >
            {data.states.map((st) => {
              return (
                <MenuItem key={st.name} value={st.name}>
                  {st.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          sx={{
            mt: 1,
            backgroundColor: "rgb(255, 212, 82)",
            color: "black",
            "&:hover": { backgroundColor: "rgb(196, 99, 196)" },
          }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
      {success ? (
        <Dialog
          open={success}
          onClose={() => setSuccess(false)}
          sx={{ height: 200 }}
        >
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Submission successful! Thank you!
          </Alert>
        </Dialog>
      ) : null}
    </div>
  );
};

export default Form;
