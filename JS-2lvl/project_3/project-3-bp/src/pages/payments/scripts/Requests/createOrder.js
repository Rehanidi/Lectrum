import {url} from '../../../index/scripts/login';

export const createOrder  = async (payment) => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  try {
    const response = await fetch(`${url}/ironbank/orders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(payment),
    });
    if (!response.ok) {
      throw new Error('неуспешный запрос');
    }
  } catch (error) {
    console.log(error.message);
  }
};
