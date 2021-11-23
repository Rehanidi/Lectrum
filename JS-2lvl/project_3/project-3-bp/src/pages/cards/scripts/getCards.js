import {url} from '../../index/scripts/login';

export const getCards  = async () => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  try {
    const response = await fetch(`${url}/ironbank/cards`, {
      method: 'GET',
      headers: {
        'x-token': token,
      },
    });
    const source = await response.json();
    if (!response.ok) {
      throw new Error('неуспешный запрос');
    }
    return JSON.stringify(source.data);
  } catch (error) {
    console.log(error.message);
  }
};
