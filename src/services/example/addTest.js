import axios from 'axios';


export async function addTest(data, headers) {
  try {
    console.log("API URL:", data);

    let res = await axios.post(
      
      `${process.env.REACT_APP_API_URL}/addTest`,
      data,
      { headers: headers }
    );
  
    return res;
  } catch (err) {
    console.log(err);
  }
}

