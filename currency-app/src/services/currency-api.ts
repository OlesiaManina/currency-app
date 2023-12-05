import axios from 'axios';

export default async function fetchRates() {
    try {
      const response = await axios.get("https://open.er-api.com/v6/latest")
      return response.data.rates;
    } catch (error) {
      throw new Error(`Error fetching currency rates: ${error}`);
    }
  }