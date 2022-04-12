/* TODO: inserite il codice JavaScript necessario a completare il MHW! */


function checkFoto(event) {
  const image = event.currentTarget;
  const checkbox = image.querySelector('.checkbox');
  
  if (checkbox.getAttribute('src') == 'images/unchecked.png') {
    const checkboxesSection = image.parentNode.querySelectorAll('.checkbox'); 
    for (const checkboxSection of checkboxesSection) {
      if (checkboxSection.getAttribute('src') == 'images/checked.png') {
        checkboxSection.src = 'images/unchecked.png';
        checkboxSection.parentNode.classList.remove('checked');
      }
      checkboxSection.parentNode.classList.add('opacity');
    }
  }
  checkbox.src = 'images/checked.png';
  checkbox.parentNode.classList.remove('opacity');
  checkbox.parentNode.classList.add('checked');
  disabilitaSelezione();
}

function disabilitaSelezione () {
    const max = 3;
    let isFinished = false;
    const checked = document.querySelectorAll('.checked');
    if (checked.length == max) {
      isFinished = true;
      for (const img of images) {
        img.removeEventListener('click', checkFoto);
      }
    }
    if (isFinished) {
      daiRisultato();
    }
}

function daiRisultato() {
  const risultato = document.querySelector('.risultato');
  calcolaPersonalita();
  risultato.classList.remove('hidden');
}


function ricominciaQuiz() {
  scrollTo(0,0);  //riporta all'inizio della pagina (in alto)
  
  const checkboxes = document.querySelectorAll('.checkbox');
  
  for (const checkbox of checkboxes)
  {
    checkbox.src= 'images/unchecked.png';
    checkbox.parentNode.addEventListener('click', checkFoto);  //riabilita tutti i listener per i div dei checkbox
    checkbox.parentNode.classList.remove('opacity'); //rimuove l'opacity a tutti i div (padri) dei checkbox
    const checkedes = document.querySelectorAll('.checked');
    for (let checked of checkedes) {
      checked.classList.remove('checked');  //rimuove a tutti i checkbox la classe checked per riportarli allo stato base (unchecked)
    }
  }
  const risultato = document.querySelector('.risultato');
  risultato.classList.add('hidden');    // fa sparire la sezione finale con la risposta
}

function calcolaPersonalita() {
  const checkedes = document.querySelectorAll('.checked');
  let scelte = new Array(3);
  let i = 0;
  for (let checked of checkedes) {          //riempimento del vettore con le scelte fatte dall'utente
    scelte[i] = checked.dataset.choiceId;
    console.log(scelte[i]);
    i++;
  }
  console.log(scelte);
  risultato = controllaOccorrenze(scelte); //controllo delle occurencies (parte logica per scegliere il valore che poi dovra essere visualizzato)
  if (risultato == '') {  //non ci sono occorrenze (duplicati) allora significa che dobbiamo dare come risultato la prima scelta
    risultato = scelte[0];
  }
  console.log(risultato);

  let title = document.querySelector('.risultato h1');
  let contents = document.querySelector('.risultato p');
  title.textContent = RESULTS_MAP[risultato].title;
  contents.textContent = RESULTS_MAP[risultato].contents;

}

function controllaOccorrenze(scelte) {
  let duplicato = '';
  console.log(scelte);
  for (let i = 0; i < scelte.length; i++) {
    if (scelte[i] == scelte[i+1]) {
      duplicato = scelte[i];
    }
  }
  if (scelte[1] == scelte[2]) {
      duplicato = scelte[1];
  }
  return duplicato;
}

const images = document.querySelectorAll('.choice-grid div');
for (const img of images)
{
  img.addEventListener('click', checkFoto);
}

const button = document.querySelector('button');
button.addEventListener('click', ricominciaQuiz);



