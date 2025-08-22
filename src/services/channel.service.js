import axios from 'axios';

export const generateInstructions = async (data) => {
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
    return response.data.message;
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};
