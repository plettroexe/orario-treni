access.onclick = () => {
    const url = 'https://ws.progettimolinari.it/credential/login';
    const token = '56ba61b3-a7cf-4a2d-be49-911579750e38';
  
    const loginData = {
      username: username.value,
      password: password.value
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'key': token
      },
      body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Risposta dal server:', data.result);

      if (data.result === true) {
        console.log('Accesso come admin riuscito');
        document.getElementById('login').classList.add('hidden');
        document.getElementById('login').classList.remove('visible');
        document.getElementById('content').classList.remove('hidden');
        document.getElementById('content').classList.add('visible');
    } else {
        console.log('Login fallito. Verifica le credenziali.');
      }
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
    });
  
  };