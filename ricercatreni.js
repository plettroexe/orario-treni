const token = '56ba61b3-a7cf-4a2d-be49-911579750e38';
const urlLoad = 'https://ws.progettimolinari.it/cache/get';

const load = (key) => {
    return new Promise((resolve, reject) => {
        fetch(urlLoad, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                key: token,
            },
            body: JSON.stringify({
                key: key,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Errore nella richiesta: ${response.status} ${response.statusText}`
                    );
                }
                return response.json();
            })
            .then((data) => resolve(data.result))
            .catch((error) => reject(error));
    });
};

const specificKey = 'tratte';

const partenza = document.getElementById("departure");
const arrivo = document.getElementById("arrival");
const orario = document.getElementById("time");
const ricerca = document.getElementById("search");
const trovati = document.getElementById("results");

ricerca.onclick = () =>{

    load(specificKey)
    .then(data => {
        data = JSON.parse(data).tratte;
        trovati.innerHTML= "";

        for (let i = 0; i < data.length; i++) {

            if(data[i].partenza === partenza.value || data[i].arrivo === arrivo.value || data[i].orari.includes(orario.value)){
        
               trovati.innerHTML += "Id: " + data[i].id + ", Partenza: "+ data[i].partenza + ", Arrivo: " + data[i].arrivo + ", Orari: " + data[i].orari + "<br>";
        
            }
        
         } 
         partenza.value = "";
         arrivo.value = "";
         orario.value = "";
    })
    .catch(error => {
        console.error("Si è verificato un errore durante il recupero dei dati:", error);
    });
    
}
