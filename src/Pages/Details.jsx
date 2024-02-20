import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { carDetailsAPI } from '../services/allAPI';
import { BASE_URL } from '../services/baseurl';

function Details() {
  const [details, setDetails] = useState([]); // Initialize details state as an empty array

  const getDetails = async () => {
    const reqHeader = {
      'Content-Type': 'application/json',
    };

    try {
      const result = await carDetailsAPI(reqHeader);
      console.log(result);
      if (result.status === 200) {
        setDetails(result.data);
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      <div className='mt-5' style={{ textAlign: 'center', marginBottom:"10%" }}>
        <center>
          <h1
            data-aos='fade-down'
            data-aos-easing='linear'
            data-aos-duration='800'
            style={{
              color: '#1e1e38',
              fontFamily: "'Josefin Sans', sans-serif",
            }}>
            <span style={{ color: '#218b7a' }}>R</span>
            <span>egistered</span> <span style={{ color: '#218b7a' }}>V</span>
            <span>echile </span> <span style={{ color: '#218b7a' }}>D</span>
            <span>etails</span>
          </h1>
        </center>

        <div style={{ textAlign: 'center' }} className='mb-5 mt-5'>
          <Table
            data-aos='flip-up'
            data-aos-easing='linear'
            data-aos-duration='800'
            striped
            bordered
            hover
            style={{
              maxWidth: '70%',
              fontSize: '0.8em',
              margin: 'auto',
            }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#218b7a' }}>Vechile Name</th>
                <th style={{ backgroundColor: '#218b7a' }}>Vechile Model</th>
                <th style={{ backgroundColor: '#218b7a' }}>Vechile No.</th>
                <th style={{ backgroundColor: '#218b7a' }}>Vechile Year</th>
                <th style={{ backgroundColor: '#218b7a' }}>Vechile Type</th>
                <th style={{ backgroundColor: '#218b7a' }}>
                  Items Provided with Vehicle
                </th>
                <th style={{ backgroundColor: '#218b7a' }}>Brand</th>
                <th style={{ backgroundColor: '#218b7a' }}>Defects</th>
                <th style={{ backgroundColor: '#218b7a' }}>Attachment</th>
              </tr>
            </thead>
            <tbody>
  {details?.length > 0 ? (
    details?.map((item) => (
      <tr key={item._id}>
        <td>{item.vname}</td>
        <td>{item.vmodel}</td>
        <td>{item.vnumber}</td>
        <td>{item.vyear}</td>
        <td>{item.vtype}</td>
        <td>{item.vitems}</td>
        <td>{item.vbrand}</td>
        <td>{item.vdefects}</td>
        <td style={{display:"flex"}}>
          {item.vattacthment && item.vattacthment.length > 0 && (
            item.vattacthment.map((image, index) => (
              <img style={{width:"100px",marginRight:"10px",height:"20opx"}} key={index} src={`${BASE_URL}/uploads/${image}`} alt={`Image ${index + 1}`} />
            ))
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan='9' style={{ textAlign: 'center' }}>
        Nothing to display
      </td>
    </tr>
  )}
</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Details;
