import axios from 'axios';

export const getData = async (url:string) => {
  try {
    const result = await axios.get(url);
    const data =result.data;
    const error = result.status !==200
    return {data,error}

  } catch (err) {
    return {data:null,error:err}
  }
};
