document.getElementById("enviar").addEventListener("click", function validarFormulario() {
         let nombre = document.getElementById("nombre");
         let email = document.getElementById("email");
         let telefono = document.getElementById("telefono");
         let opiniones = document.getElementById("opiniones");
         let pais = document.getElementById("pais");
         let checkboxes = document.querySelectorAll("input[name='intereses']:checked");

         function validarCampo(input) {
            if (input.value.trim() !== "") {
               input.classList.add("correcto");
               input.classList.remove("incorrecto");
               return true;
            } else {
               input.classList.add("incorrecto");
               input.classList.remove("correcto");
               return false;
            }
         }
         function validarEmail(input) {
            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(input.value.trim())) {
               input.classList.add("correcto");
               input.classList.remove("incorrecto");
               return true;
            } else {
               input.classList.add("incorrecto");
               input.classList.remove("correcto");
               return false;
            }
         }
         let validNombre = validarCampo(nombre);
         let validEmail = validarEmail(email);
         let validTelefono = validarCampo(telefono);
         let validOpiniones = validarCampo(opiniones);
         let validPais = validarCampo(pais);
         let validIntereses = checkboxes.length > 0;

         document.querySelectorAll("input[name='intereses']").forEach(checkbox => {
            checkbox.parentNode.style.backgroundColor = validIntereses ? "lightgreen" : "lightcoral";
         });
         if (validNombre && validEmail && validTelefono && validOpiniones && validPais && validIntereses) {
            let nuevoRegistro = document.createElement("fieldset");
            nuevoRegistro.innerHTML = `
            <legend>Información enviada!</legend>
            <p><strong>Nombre:</strong> ${nombre.value}</p>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Teléfono:</strong> ${telefono.value}</p>
            <p><strong>Opinión:</strong> ${opiniones.value}</p>
            <p><strong>País:</strong> ${pais.options[pais.selectedIndex].text}</p>
            <p><strong>Intereses:</strong> ${Array.from(checkboxes).map(i => i.value).join(", ")}</p>
        `;
            let botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("btn-eliminar");
            botonEliminar.addEventListener("click", function () {
               nuevoRegistro.remove();
            });
            let seccionComentarios = document.createElement("div");
            seccionComentarios.innerHTML = `
            <h3>Comentarios Extras</h3>
            <textarea placeholder="Escribe un comentario"></textarea>
            <button type="button" class="agregarComentario">Agregar Comentario</button>
            <div class="listaComentarios"></div>
        `;
            let botonAgregarComentario = seccionComentarios.querySelector(".agregarComentario");
            let areaTextoComentario = seccionComentarios.querySelector("textarea");
            let listaComentarios = seccionComentarios.querySelector(".listaComentarios");

            botonAgregarComentario.addEventListener("click", function () {
               let comentarioTexto = areaTextoComentario.value.trim();
               if (comentarioTexto === "") {
                  alert("Por favor, ingresa un comentario antes de agregarlo.");
                  return;
               }
               let nuevoComentario = document.createElement("div");
               nuevoComentario.classList.add("comentario");
               nuevoComentario.innerHTML = `<p><strong>Comentario:</strong> ${comentarioTexto}</p>`;
               listaComentarios.appendChild(nuevoComentario);
               areaTextoComentario.value = ""; 
            });
            nuevoRegistro.appendChild(seccionComentarios);
            nuevoRegistro.appendChild(botonEliminar);
            document.getElementById("contenedorRegistros").appendChild(nuevoRegistro);
            document.querySelector("form").reset();
            [nombre, email, telefono, opiniones, pais].forEach(input => {
               input.classList.remove("correcto", "incorrecto");
            });
            document.querySelectorAll("input[name='intereses']").forEach(checkbox => {
               checkbox.parentNode.style.backgroundColor = "";
            });
         }
      });
