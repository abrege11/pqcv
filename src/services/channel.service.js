import axios from 'axios';

export const generateInstructions = async (data) => {
console.log(import.meta.env.VITE_BASE_URL, data);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/generateInstructions`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Data submitted successfully:', response.data);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};
