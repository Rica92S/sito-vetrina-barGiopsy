document.addEventListener("DOMContentLoaded", () => {
  console.log('dom loaded')

  const slider = document.querySelector('.gallery');
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', _ => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', _ => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const SCROLL_SPEED = 3;
    const walk = (x - startX) * SCROLL_SPEED;
    slider.scrollLeft = scrollLeft - walk;
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  let submitForm = document.querySelector("#headerForm")
  console.log(submitForm)

  let name = document.querySelector("#nome")
  let surname = document.querySelector("#cognome")
  let phone = document.querySelector("#cellulare")
  let pay = document.querySelector("#pagamento")
  let message = document.querySelector("#messaggio")
  let submitted = document.querySelector(".formSubmitted")

  submitForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validaNome(name)
    validaCognome(surname)
    validaTelefono(phone)
    checked(pay)
    textControl(message)

    if (document.querySelectorAll(".errore").length == 0) {
      submitForm.style.display = "none";
      submitted.style.display="block";
      console.log("form inviato")
    }


  })

})//dom ready

function validaNome(nome) {

  const regName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;

  if (nome.value.trim() <= 1) {
    nome.classList.add("errore")
    console.log("nome assente")

  } else if (regName.test(nome.value)) {
    console.log(regName.test(nome))
    console.log("nome valido")
    nome.classList.remove("errore")
    return regName.test(nome)
  } else {
    nome.classList.add("errore")
    console.log("nome non valido")
  }
}//nome

function textControl(text) {
  if (text.value == "") {
    text.classList.add("errore")
    console.log('messaggio assente')
  } else {
    text.classList.remove("errore")
  }

}

function validaCognome(cognome) {

  const regName = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;

  if (cognome.value.trim().length <= 1) {
    cognome.classList.add("errore")
    console.log("cognome assente")

  } else if (regName.test(cognome.value)) {
    console.log(regName.test(cognome))
    console.log("cognome valido")
    cognome.classList.remove("errore")
    return regName.test(cognome)
  } else {
    cognome.classList.add("errore")
    console.log("cognome non valido")
  }
}//cognome

function validaTelefono(telefono) {
  const regPhone = /^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[4-90]|36[680]|33[13-90]|32[89]|35[01]|37[019])(\s?\d{3}\s?\d{3,4}|\d{6,7})$/
  //per numeri di cellulare italiani, senza spazi (previsto prefisso 0039 o soltano numero);

  if (telefono.value == "") {
    telefono.classList.add("errore")
    console.log("telefono assente")

  } else if (regPhone.test(telefono.value)) {
    console.log(regPhone.test(telefono))
    console.log("telefono valido")
    telefono.classList.remove("errore")
    return regPhone.test(telefono)
  } else {
    telefono.classList.add("errore")
    console.log("telefono non valido")
  }

}//telefono


function checked(select) {
  if (select.value) {
    return true;
  } else {
    select.classList.add("errore")
    return false;

  }
}//checked