import {url} from './login';

export const registration  = async (user) => {
  const responseUser = await fetch(`${url}/ironbank/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  try {
    const source = await responseUser.json();
    console.log(source);
    if (!responseUser.ok) {
      throw new Error('неуспешный запрос');
    }
    localStorage.setItem('token', JSON.stringify(source));
    window.location.href='issue-card.html';
  } catch (error) {
    console.log(error.message);
  }
};
