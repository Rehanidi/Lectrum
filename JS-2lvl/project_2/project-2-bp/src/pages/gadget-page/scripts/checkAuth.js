export const checkAuth  = async () => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  const addGadget = document.querySelector('a[class="btn-red hidden"]');
  const addProfile = document.getElementById('profile');
  const addProfileName = document.getElementById('profileName');
  try {
    const response = await fetch('https://lab.lectrum.io/js2/api/zavidovo/auth', {
      method: 'GET',
      headers: {
        'x-token': token,
      },
    });
    const responseUserProfile = await fetch('https://lab.lectrum.io/js2/api/zavidovo/profile', {
      method: 'GET',
      headers: {
        'x-token': token,
      },
    });
    const source = await responseUserProfile.json();
    addProfileName.textContent = source.data.name;
    if (!response.ok) {
      throw new Error('неуспешный запрос');
    } else {
      addGadget.classList.remove('hidden');
      addProfile.classList.remove('hidden');
      addProfileName.textContent = source.data.name;
      if (window.location.pathname === '/gadget-page.html') {
        const editButton = document.getElementById('editButton');
        editButton.classList.remove('hidden');
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
