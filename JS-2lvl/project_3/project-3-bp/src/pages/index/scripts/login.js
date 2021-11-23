export const url = 'https://lab.lectrum.io/js2/api';

export const logIn  = async (user) => {
  try {
    const responseUser = await fetch(`${url}/ironbank/login`, {
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
    localStorage.setItem('token', JSON.stringify(source));
    window.location.href='issue-card.html';
  } catch (error) {
    console.log(error.message);
  }
};
