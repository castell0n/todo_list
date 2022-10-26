const newNota = document.getElementById("nueva_nota");
const contenLis = document.getElementById("list");
const eliminar = document.getElementsByClassName("close");

console.log(nota);

var i;
for (i = 0; i < eliminar.length; i++) {
  eliminar[i].onclick = function() {
    let div = this.parentElement;
    div.remove(div);
  }
}


function agregarNota() {
    if (newNota.value === "") {
        alert("El campo se encuentra vaío");
    } else {
        const newli = `
        <span id="itemlist" class="item_list">
            <h4 id="nota" class="nota">${newNota.value}</h4>
            <button id="close" class="close">
                <i class="bi bi-x-circle-fill"></i>    
            </button>
        </span>`;

        contenLis.innerHTML += newli;

        newNota.value = "";
    
        for (i = 0; i < eliminar.length; i++) {
            eliminar[i].onclick = function() {
                var div = this.parentElement;
                div.remove(div);
            }
        }
    }
}