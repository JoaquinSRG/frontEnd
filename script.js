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
               input.classList.remove("incorrecto")
               return true;
            } else {
               input.classList.add("incorrecto");
               input.classList.remove("correcto");
               return false;
            }
         }

         let validNombre = validarCampo(nombre);
         let validEmail = validarCampo(email);
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
               <legend>Informacion enviada!</legend>
               <p><strong>Nombre:</strong> ${nombre.value}</p>
               <p><strong>Email:</strong> ${email.value}</p>
               <p><strong>Teléfono:</strong> ${telefono.value}</p>
               <p><strong>Opinión:</strong> ${opiniones.value}</p>
               <p><strong>País:</strong> ${pais.options[pais.selectedIndex].text}</p>
               <p><strong>Intereses:</strong> ${Array.from(checkboxes).map(i => i.value).join(", ")}</p>
            `;

            document.getElementById("registros").appendChild(nuevoRegistro);
            document.querySelector("form").reset();

            [nombre, email, telefono, opiniones, pais].forEach(input => {
               input.classList.remove("correcto", "incorrecto");
            });
            document.querySelectorAll("input[name='intereses']").forEach(checkbox => {
               checkbox.parentNode.style.backgroundColor = "";
            });
         }
      });