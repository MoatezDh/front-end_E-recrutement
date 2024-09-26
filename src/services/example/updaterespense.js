import axios from 'axios';

export async function updaterespense(id, data) {
  try {
    console.log("id",id)
    console.log("data",data)
    let res = await axios.put(
      `${process.env.REACT_APP_API_URL}/updaterespense/${id}`,
      data
    );
    
    return res.data;
  } catch (err) {
    
    console.log(err);
  }
}