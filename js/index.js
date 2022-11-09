const db = firebase.firestore();


// <!-- Script -->
const loader = document.querySelector('.spinner');
const cuerpo = document.querySelector('body');
window.onload = function(){
  setTimeout(function(){
    loader.style.display = 'none';
    cuerpo.style.overflow = 'auto';
  }, 4000); // Puedes cambiar el tiempo cada mil es 1 segundo.
}

const inputNewNota = document.getElementById("nueva_nota");
const contenLis = document.getElementById("content_list");
const eliminar = document.getElementsByClassName("btn-eliminar");
document.getElementById("btn_agregar").addEventListener("click", btnAgregar);

// Add a new document in collection "cities"
function btnAgregar(){
  if (inputNewNota.value == "") {
    alert("campo vacio")
  } else {
    db.collection("MisTareas").doc().set({
      tarea: inputNewNota.value,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
    inputNewNota.value= "";
  }
}

db.collection("MisTareas").onSnapshot((querySnapshot) => {
  contenLis.innerHTML = ` `;
  querySnapshot.forEach((doc) => {
    contenLis.innerHTML +=
    `<span data-id="${doc.id}" class="flex items-center justify-between mb-[0.6rem] w-[100%] h-[2.5rem] bg-[#ffffff] text-[#191e21] rounded-[0.4rem] overflow-hidden">
      <h4 class="text-start text-[15px] py-[0.2rem] pb-[0.3rem] px-[1rem] min-w-[80%] whitespace-nowrap truncate overflow-hidden">${doc.data().tarea}</h4>
      <button class="btn-eliminar w-[40%] h-[100%] bg-[#ffffff] text-[#191e21]">
          <i class="bi bi-x-circle-fill flex items-center justify-center"></i>
      </button>
    </span>`
    ;

    let btndelete = contenLis.querySelectorAll(".btn-eliminar");
    btndelete.forEach(btn => {
      btn.addEventListener("click", e => {
        let id = e.target.parentElement.parentElement.getAttribute("data-id");
        db.collection("MisTareas").doc(id).delete();
      })
    })
  });
});