import React, { useState } from 'react'
import './style.css'
import FormLabel from '@mui/material/FormLabel';
import { ButtonGroup, Form } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { FormGroup, Input, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {  InputLabel, MenuItem, Select } from '@mui/material';
import Swal from 'sweetalert2';
import { styled } from '@mui/material/styles';
import { carRegisterAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
function Register() {

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const navigation = useNavigate()

const [regDetails,setRegDetails] = useState({
  vname:"",
  vmodel:"",
  vnumber:"",
  vyear:"",
  vtype:"",
  vitems:[],
  vbrand:"",
  vdefects:[],
  vattacthment:[]
})
console.log(regDetails);

const [showDropdown, setShowDropdown] = useState(false);

const handleDefectSelect = (defect) => {
  if (regDetails.vdefects.includes(defect)) {
    setRegDetails(prevState => ({ ...prevState, vdefects: prevState.vdefects.filter(item => item !== defect) }));
  } else {
    setRegDetails(prevState => ({ ...prevState, vdefects: [...prevState.vdefects, defect] }));
  }
  setShowDropdown(false); 
};


const handleCancel =()=>{
  {
setRegDetails({
  vname:"",
  vmodel:"",
  vnumber:"",
  vyear:"",
  vtype:"",
  vitems:[],
  vbrand:"",
  vdefects:[],
  vattacthment:[]
})
  }
}

const handleSubmit = async(e)=>{
e.preventDefault()
const{
  vname,
  vmodel,
  vnumber,
  vyear,
  vtype,
  vitems,
  vbrand,
  vdefects,
  vattacthment
}= regDetails

if(!vname || !vmodel || !vnumber || !vyear || !vtype ||!vitems ||!vbrand ||!vdefects ||!vattacthment ){
  alert('please fill the form completely')
}
else{
const reqBody = new FormData()

reqBody.append("vname",vname)
reqBody.append("vmodel",vmodel)
reqBody.append("vnumber",vnumber)
reqBody.append("vyear",vyear)
reqBody.append("vtype",vtype)
reqBody.append("vitems",vitems)
reqBody.append("vbrand",vbrand)
reqBody.append("vdefects",vdefects)
reqBody.append("vattacthment",vattacthment)

for (let i = 0; i < vattacthment.length; i++) {
  reqBody.append("vattacthment", vattacthment[i]);

}
const reqHeader = {
  "Content-Type":"multipart/form-data",

} 

  const result = await carRegisterAPI(reqBody,reqHeader)
console.log(result);
console.log(regDetails.vattacthment);


if (result.status === 200) {
  console.log(result.data);
  Swal.fire({
    icon: 'success',
    title: 'Submitted',
    showConfirmButton: false,
    timer: 1500 
  }).then(() => {
    navigation('/details');
  });

  handleCancel();
} else {
  console.log(result.response.data);
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: 'Please try again later.'
  });
}
}

}


  return (
   <div style={{alignItems:"center",justifyContent:"center",display:"flex",}}>
        <div style={{display:"flex",background:"white",width:"70%",height:"600px",marginTop:"5%",boxShadow: '5 20px 25px ',}} className="app">
   <div style={{backgroundColor:"white",width:"100%"}} className="registration-section">
   <center className='mt-3'>  <h1 style={{fontFamily:'"Protest Guerrilla", sans-serif'}}> <span style={{color:"#096d51"}}>Gear </span><span style={{color:""}}><i  class="fa-solid fa-van-shuttle fa-fade"></i></span>  <span style={{color:"#c20000"}}>Garage </span></h1></center>
      <center><h5 style={{fontFamily:'"Noto Sans Buhid", sans-serif',fontWeight:"100"}}> <b>Garage Vehicle Registration</b></h5>
      <hr style={{width:"600px" }} /></center>
      <Row><Col md={4}><Form.Group className='ms-2'  >
           <TextField style={{backgroundColor:"#fbffff",boxShadow: '0 1px 2px '}} size="small"  id="outlined-basic"  color="success" label="Vehicle Name" variant="filled" value={regDetails.vname} onChange={(e)=>setRegDetails({...regDetails,vname:e.target.value})}/></Form.Group></Col> 
           <Col md={4}><Form.Group className=''  >
           <TextField style={{backgroundColor:"#fbffff",boxShadow: '0 1px 2px '}}  size="small" id="outlined-basic" color="success"  label="Vehicle Model" variant="filled" value={regDetails.vmodel} onChange={(e)=>setRegDetails({...regDetails,vmodel:e.target.value})} /></Form.Group></Col> 
           <Col md={4}><Form.Group className='me-2'  >
           <TextField style={{backgroundColor:"#fbffff",boxShadow: '0 1px 2px '}} size="small" id="outlined-basic" color="success"  label="Vehicle Number" variant="filled" value={regDetails.vnumber} onChange={(e)=>setRegDetails({...regDetails,vnumber:e.target.value})} /></Form.Group></Col> 
           </Row>
           
           <Row>
           <Col md={6} ><Form.Group className='ms-4 mt-4'  >
           <FormLabel style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", margin: "0" ,color:"black"}} className='ms-3 ' id="demo-row-radio-buttons-group-label">Vehicle Year :</FormLabel>
            <Input value={regDetails.vyear} onChange={(e)=>setRegDetails({...regDetails,vyear:e.target.value})} className='ms-4 mt-2' style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} type="date" 
                placeholder="Check-In Date" />

</Form.Group></Col> 
           

           
            <Col md={6}>
            
             <FormControl><Form.Group className='ms-4 mt-4'  >
      <FormLabel style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", margin: "0" ,color:"black"}}  id="demo-row-radio-buttons-group-label"> <b>Vehicle Type :</b></FormLabel>
      <RadioGroup  className=''
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        color='success'
        value={regDetails.vtype}
        onChange={ (e) => 
          setRegDetails({
            ...regDetails,
            vtype: e.target.value
          })}
      >
        <FormControlLabel className='ms-' value="Bike" control={<Radio style={{ color: '#096d51' }} />} label="Bike" />
        <FormControlLabel value="Car" control={<Radio style={{ color: '#096d51' }} />} label="Car" />
     
      
      </RadioGroup></Form.Group>
    </FormControl></Col>
           </Row>


           <Row className='ms-4 mt-4'><Col md={6}>
     
        <FormControl component="fieldset">
          <Row style={{ marginBottom: "5px" }}>
            <Col>
              <h6 style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold" }}>Items Provided with Vehicle :</h6>
            </Col>
          </Row>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              className='ms-3'
              control={<Checkbox style={{ color: '#096d51' }} onChange={(e) => e.target.checked ? setRegDetails(prevDetails => ({ ...prevDetails, vitems: [...prevDetails.vitems, "Helmet"] })) : setRegDetails(prevDetails => ({ ...prevDetails, vitems: prevDetails.vitems.filter(item => item !== "Helmet") }))} />}
              label="Helmet"
              labelPlacement="start"
            />
            <FormControlLabel
              className='ms-3'
              control={<Checkbox style={{ color: '#096d51' }} onChange={(e) => e.target.checked ? setRegDetails(prevDetails => ({ ...prevDetails, vitems: [...prevDetails.vitems, "Key"] })) : setRegDetails(prevDetails => ({ ...prevDetails, vitems: prevDetails.vitems.filter(item => item !== "Key") }))} />}
              label="Key"
              labelPlacement="start"
            />
            <FormControlLabel
              className='ms-3'
              control={<Checkbox style={{ color: '#096d51' }} onChange={(e) => e.target.checked ? setRegDetails(prevDetails => ({ ...prevDetails, vitems: [...prevDetails.vitems, "Petrol"] })) : setRegDetails(prevDetails => ({ ...prevDetails, vitems: prevDetails.vitems.filter(item => item !== "Petrol") }))} />}
              label="Petrol"
              labelPlacement="start"
            />
          </FormGroup>
        </FormControl>
      </Col>
           
           <Col md={6}>
            <div>

            <InputLabel
        id="brand-select-label"
        style={{
          fontFamily: '"Noto Sans Buhid", sans-serif',
          fontWeight: 'bold',
          color: 'black',
          marginRight: '', 
        }}
      >
        Brand :
      </InputLabel>
      <FormControl size='small' style={{ margin: '8px', width: '200px' }}>
        <Select
          labelId="brand-select-label"
          id="brand-select"
          value={regDetails.vbrand}
          onChange={(event) =>
            setRegDetails({ ...regDetails, vbrand: event.target.value })
          }
          style={{
            backgroundColor: '#d9e0de',
            boxShadow: '0 1px 1px',
          }}
        >

          
          <MenuItem value="Honda">Honda</MenuItem>
          <MenuItem value="Ford">Ford</MenuItem>
          <MenuItem value="BMW">BMW</MenuItem>
          <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
          <MenuItem value="Audi">Audi</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      </div>
            </Col>
           </Row>
<Row>
<Col md={6}>
            <div >
            <FormLabel className='ms-4 mt-5 me-2' style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold", color: "black" }} id="demo-row-radio-buttons-group-label"> <b>Defects : </b></FormLabel>
            <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)} style={{ boxShadow: '0 1px 1px ' }} as={ButtonGroup} className="me-2">
        <Button style={{ backgroundColor: "#d3dbdb" }} variant="success">Vehicle Defects</Button>

        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleDefectSelect("Engine misfiring")} active={regDetails.vdefects.includes("Engine misfiring")} style={{ backgroundColor: regDetails.vdefects.includes("Engine misfiring") ? '#096d51' : 'transparent' }}>Engine misfiring</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDefectSelect("Leaking radiator")} active={regDetails.vdefects.includes("Leaking radiator")} style={{ backgroundColor: regDetails.vdefects.includes("Leaking radiator") ? '#096d51' : 'transparent' }}>Leaking radiator</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDefectSelect("Flickering headlights")} active={regDetails.vdefects.includes("Flickering headlights")} style={{ backgroundColor: regDetails.vdefects.includes("Flickering headlights") ? '#096d51' : 'transparent' }}>Flickering headlights</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDefectSelect("Scratches on the exterior paint")} active={regDetails.vdefects.includes("Scratches on the exterior paint")} style={{ backgroundColor: regDetails.vdefects.includes("Scratches on the exterior paint") ? '#096d51' : 'transparent' }}>Scratches on the exterior paint</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDefectSelect("Other")} active={regDetails.vdefects.includes("Other")} style={{ backgroundColor: regDetails.vdefects.includes("Other") ? '#096d51' : 'transparent' }}>Other</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> </div>
            </Col>

            <Col md={6}>
            <FormLabel className='ms-4 mt-5' style={{ fontFamily: '"Noto Sans Buhid", sans-serif', fontWeight: "bold" ,color:"black"}}  id="demo-row-radio-buttons-group-label"> <b>Attachment : </b></FormLabel>

            <Button
      style={{ backgroundColor: "#d3dbdb", color: "black", boxShadow: '0 1px 1px' }}
      className='ms-4'
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => {
          setRegDetails(prevState => ({
            ...prevState,
            vattacthment: event.target.files
          }));
        }}
        multiple
      />
    </Button>
   

            </Col>

</Row>
<center className='mt-5'>
<Button style={{backgroundColor:"#c20000"}} onClick={handleCancel}  variant="contained">Cancel</Button>
<Button className='ms-2' style={{backgroundColor:"#096d51"}} onClick={handleSubmit} variant="contained">Submit</Button>
</center>


</div>
        <img style={{width:"40%"}} src='https://wallup.net/wp-content/uploads/2016/03/12/341763-Audi_R8-car-vehicle-Super_Car-portrait_display-red_cars-748x1197.jpg' alt="" />
      
   

</div></div>




  )
}

export default Register

