import { useState, useCallback } from 'react';

const useHTTP = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method : requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.Headers ? requestConfig.headers : {},
          body : requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error('Request failed!');
      }

      const data = await response.json();

      applyData(data);

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useHTTP;