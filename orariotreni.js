const table = document.getElementById("table");

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

const token = '56ba61b3-a7cf-4a2d-be49-911579750e38';
const urlLoad = "https://ws.progettimolinari.it/cache/get";

const load = (key) => {
    return new Promise((resolve, reject) => {
        fetch(urlLoad, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                key: token
            },
            body: JSON.stringify({
                key: key
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => resolve(data.result))
        .catch(error => reject(error));
    });
};

const specificKey = 'tratte';

load(specificKey)
    .then(data => {
        console.log("Dati recuperati con successo:", JSON.parse(data).tratte);
        render(JSON.parse(data).tratte);
    })
    .catch(error => {
        console.error("Si è verificato un errore durante il recupero dei dati:", error);
    });
    
    const tableHeader = `<tr>
    <th>ID</th>
    <th>PARTENZA</th>
    <th>ARRIVO</th>
    <th>DURATA</th>
    <th>COMPAGNIA</th>
    <th>ORARI PARTENZA</th>
  </tr>`;
  
  const template = `<tr>
    <td>%ID</td>
    <td>%PARTENZA</td>
    <td>%ARRIVO</td>
    <td>%DURATA</td>
    <td>%COMPAGNIA</td>
    <td>%ORARI</td>
  </tr>`;
  
  const render = (data) => {
      let html = tableHeader;
      for (let i = 0; i < data.length; i++) {
        let orariPartenza = data[i].orari_partenza.join(', '); // Unisci gli orari con una virgola
        let rowHtml = template.replace("%ID", data[i].id);
        rowHtml = rowHtml.replace("%PARTENZA", data[i].partenza);
        rowHtml = rowHtml.replace("%ARRIVO", data[i].arrivo);
        rowHtml = rowHtml.replace("%DURATA", data[i].durata);
        rowHtml = rowHtml.replace("%COMPAGNIA", data[i].compagnia);
        rowHtml = rowHtml.replace("%ORARI", orariPartenza);
        html += rowHtml;
      }
      table.innerHTML = html;
  };
  
  