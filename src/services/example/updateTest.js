import axios from 'axios';



export async function updateTest(id,data, headers) {
  console.log(data);
  try {
    const url = `/api/test/update/${id}`;  // Double-check if this is the correct URL
    console.log('API URL:', url);  // Log the full URL for debugging
    const response = await axios.put(url, data);
    console.log('Update Response:', response);
  } catch (error) {
    console.error('Error updating test:', error.message);
  }
}
