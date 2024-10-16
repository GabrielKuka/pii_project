import axios from "axios";
import { ENDPOINT } from "../config";

async function search(fieldValue, searchFilters) {
  const response = await axios.get(
    // Port 1234 for testing
    `${ENDPOINT}/?search=${fieldValue}&passports=${searchFilters.passports}&ids=${searchFilters.ids}`
  );

  return response?.status == 200 ? response.data : [];
}

export default {
  search,
};
