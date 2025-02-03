import axios from "axios";

export const fetch = async () => {
    const token = localStorage.getItem('token')
    try {

      const res = await axios.get('http://localhost:3000/get-products',
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Post', res.data);
     

    } catch (error) {
      console.error('Error fetching products', error);
    }


  }
