const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchURL = async () => {
  const result = await fetch(API_URL);
  return result.json();
};

export default fetchURL;
