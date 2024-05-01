import React, { useEffect } from 'react';
import axios from 'axios';

const TaskPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = 'leone.bellotti@gmail.com';
        const password = 'b3ll0tt1';
        const serviceId = 4728;

        const url = 'https://login.globo.com/api/authentication';

        const jsonAuth = {
          captcha: '',
          payload: {
            email,
            password,
            serviceId
          }
        };

        const response = await axios.post(url, jsonAuth);
        const { glbId } = response.data;

        // Do something with glbId
        console.log(glbId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Your React component content */}
      321
    </div>
  );
};

export default TaskPage;
