import axios from 'axios';

export async function getTest(id, headers) {
  try {
    let res = await axios.get(`${process.env.REACT_APP_API_URL}/getTest/${id}`, {
      headers: headers,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}
