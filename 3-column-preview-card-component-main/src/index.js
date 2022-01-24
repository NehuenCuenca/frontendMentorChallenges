const columnas = document.querySelectorAll('.columna')

let columnaActiva = null

function buscarColumnaActiva(){
    columnas.forEach((columna, i)=>{
        if(columna.classList.contains('activa')){
            columnaActiva= i
            return
        }
    })
};

buscarColumnaActiva();

console.log(columnas);

columnas.forEach((columna, i) => {
    columna.addEventListener('click', () => {
        cambiarColumna(i)
    })
})

function cambiarColumna(indice){
    columnas[columnaActiva].classList.remove('activa');
    columnas[indice].classList.add('activa');
    columnaActiva= indice;
}