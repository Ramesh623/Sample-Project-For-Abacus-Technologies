import axios from "axios";
import { API_BASE, GET_DRINKS_PRODUCTS } from "./api_urls";

/**
 * Get Drinks Products 
 */
export const getDrinksProducts  = async (searchString: string | null) => {
    return await axios({
      method: "GET",
      baseURL: API_BASE,
      url: GET_DRINKS_PRODUCTS,
      headers: {},
      params: {
        s: searchString
      }
    })
      .then((response) => {
        console.log(response, "*************Get Drinks Products response*******************");
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };