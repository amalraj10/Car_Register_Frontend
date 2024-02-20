import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI";

//registration
export const carRegisterAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/register/add`,reqBody,reqHeader)
  }


  export const carDetailsAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/register/details`,reqHeader)
  }