import {saveTokenToLocaleStorage} from './index';

export const logIn  = async (user) => {
  try {
    const responseUser = await fetch('https://lab.lectrum.io/js2/api/zavidovo/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const source = await responseUser.json();
    if (!responseUser.ok) {
      throw new Error('неуспешный запрос');
    }
    saveTokenToLocaleStorage(source);
    window.location.href='index.html';
  } catch (error) {
    console.log(error.message);
  }
};
