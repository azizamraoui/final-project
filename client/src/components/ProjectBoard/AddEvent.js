import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { ToastContainer } from "react-toastr";

export default function AddEvent() {

  var [title, setTitle] = useState("");
  var [startDate, setStartDate] = useState(null);
  var [endDate, setEndDate] = useState(null);

  const handleSubmit = () => {
    if (title && startDate && endDate) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var axios = require('axios');
      var raw = JSON.stringify({
        "title": title,
        "startDate": new Date(startDate),
        "endDate": new Date(endDate)
      });
      var config = {
        method: 'post',
        url: 'http://localhost:4000/event',
        headers: {
          'Content-Type': 'application/json'
        },
        data: raw
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        }).catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("please enter valid data")
    }
  };

  return (
    <Card className="cardroot">
      <CardHeader className="head-title ontrack" title="Add Event"></CardHeader>
      {/* form */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        onChange={(event) => setTitle(event.target.value)}
      />
      <Typography style={{ textAlign: 'start' }}>
        Start Date
        </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="startDate"
        name="startDate"
        type="datetime-local"
        onChange={(event) => setStartDate(event.target.value)}
      />
      <Typography style={{ textAlign: 'start' }}>
        End Date
        </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="endDate"
        name="endDate"
        type="datetime-local"
        onChange={(event) => setEndDate(event.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}>
        Add
          </Button>
      {/* end form */}

    </Card>
  );
}
