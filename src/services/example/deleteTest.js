import axios from 'axios';



export async function deleteTest(data, headers) {
  try {
    console.log(data)
    let res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/deleteTest/${data}`,
      { headers: headers }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}
