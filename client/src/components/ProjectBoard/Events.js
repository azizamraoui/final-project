import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

export default function Events() {

  var [data, setData] = useState([]);

  const getEvents = async () => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'http://localhost:4000/event',
      headers: {}
    };

    return await axios(config)
      .then(function (response) {
        console.log(response.data);
        response.data.map(event => {
          event.startDate = new Date(event.startDate).toLocaleString();
          event.endDate = new Date(event.endDate).toLocaleString();
        });
        setData(response.data)
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    (async function anyNameFunction() {
      data = await getEvents();
    })();
  }, []);

  const deleteEvent = (id) => {
    console.log("delete", id)
    var axios = require('axios');

    var config = {
      method: 'delete',
      url: 'http://localhost:4000/event/' + id,
      headers: {}
    };

    axios(config)
      .then(async function (response) {
        console.log(JSON.stringify(response.data));
        data = await getEvents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Card className="cardroot">
      <CardHeader className="head-title ontrack" title="Events List"></CardHeader>
      {data.map(elem => (
        <Card className="card-inner-block" key={data.indexOf(elem)}>
          <CardHeader className="heading-title "
            action={
              <IconButton aria-label="delete" onClick={() => deleteEvent(elem._id)}>
                <Delete />
              </IconButton>
            }
            title={elem.title}
            subheader={`date : ${elem.startDate} - ${elem.endDate}`}
          />
        </Card>
      ))}
    </Card>
  );
}
