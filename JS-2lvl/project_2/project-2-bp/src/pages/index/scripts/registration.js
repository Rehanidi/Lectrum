import {saveTokenToLocaleStorage} from './index';

export const registration  = async (user) => {
  try {
    const response = await fetch('https://lab.lectrum.io/js2/api/zavidovo/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const source = await response.json();
    if (!response.ok) {
      throw new Error('неуспешный запрос');
    }
    window.location.href='index.html';
    saveTokenToLocaleStorage(source);
  } catch (error) {
    console.log(error.message);
  }
};
