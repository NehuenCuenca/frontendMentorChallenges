//guardo btn de contraer/expander
const btnContraer = document.querySelectorAll('.block .question a')
console.log(btnContraer);
//guardo la cabecera de cada bloque
const blockAnswer = document.querySelectorAll('.block .question')
//guardo la respuesta de cada bloque
const respuestasFAQ = document.querySelectorAll('.block p.answer')

blockAnswer.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        console.log("holaa");
        respuestasFAQ[i].classList.toggle('active')
        console.log(btnContraer[i].textContent);
        cambiarBtnContraer(i)
    })
})

function cambiarBtnContraer(i){
    if(btnContraer[i].textContent == '-'){
        btnContraer[i].textContent = '+'
    } else {
        btnContraer[i].textContent = '-'
    }
}