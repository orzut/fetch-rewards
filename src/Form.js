import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import axios from "axios";

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });
  const [data, setData] = useState({ occupations: [], states: [] });

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
    <form onSubmit={handleSubmit}>
      <h2>Form</h2>
      <TextField
        sx={{ width: 300 }}
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
        required
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
        value={values.password}
        margin="dense"
      />
      <FormControl sx={{ mt: 1, width: 300 }}>
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

      <FormControl sx={{ mt: 1, width: 300 }}>
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
      <Button sx={{ mt: 1 }} variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
