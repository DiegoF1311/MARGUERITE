const activosRowMap = {}; // Mapa para rastrear las filas agrupadas por prefijo y tipo de activo

document.getElementById("agregarActivo").addEventListener("click", () => {
    const codigoInput = document.getElementById("codigo").value.trim();
    const prefijoInput = document.getElementById("prefijo").value.trim();
    const valorInput = document.getElementById("valor").value;
    const dim_a = document.getElementById("dim_a").value;
    const dim_c = document.getElementById("dim_c").value;
    const dim_i = document.getElementById("dim_i").value;
    const dim_d = document.getElementById("dim_d").value;
    const dim_t = document.getElementById("dim_t").value;
    const propietarioInput = document.getElementById("propietario").value;

    // Validar el valor para asignar una valoración
    let valoracion = "";
    if (valorInput >= 20000000) {
        valoracion = "MA";
    } else if (valorInput >= 10000000) {
        valoracion = "A";
    } else if (valorInput >= 5000000) {
        valoracion = "M";
    } else if (valorInput >= 1000000) {
        valoracion = "B";
    } else {
        valoracion = "MB";
    }

    // Buscar el activo en el mapa
    let encontrado = false;
    let prefijoTipo = "";
    let tipoActivo = "";
    let nombreActivo = "";

    for (const [tipo, datos] of Object.entries(activosMap)) {
        if (datos.activos[prefijoInput]) {
            encontrado = true;
            prefijoTipo = datos.prefijoTipo;
            tipoActivo = tipo;
            nombreActivo = datos.activos[prefijoInput];
            break;
        }
    }

    if (!encontrado) {
        alert("El prefijo ingresado no pertenece a los tipos definidos.");
        return;
    }

    const tableBody = document.querySelector("#inventarioTabla tbody");

    // Generar la clave única para agrupar por prefijo y tipoActivo
    const claveAgrupacion = `${prefijoTipo}-${tipoActivo}`;

    if (activosRowMap[claveAgrupacion]) {
        // El grupo ya existe: aumentar el rowspan y añadir una nueva fila
        const { rowspanCell, tipoCell } = activosRowMap[claveAgrupacion];
        const currentRowspan = parseInt(rowspanCell.getAttribute("rowspan")) + 1;
        rowspanCell.setAttribute("rowspan", currentRowspan);
        tipoCell.setAttribute("rowspan", currentRowspan);

        // Crear una nueva fila sin prefijo ni tipo de activo
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${codigoInput}</td>
            <td>[${prefijoInput}] ${nombreActivo}</td>
            <td>${valorInput}</td>
            <td>${valoracion}</td>
            <td>${dim_a}</td>
            <td>${dim_c}</td>
            <td>${dim_i}</td>
            <td>${dim_d}</td>
            <td>${dim_t}</td>
            <td>${propietarioInput}</td>
        `;
        tableBody.appendChild(newRow);
    } else {
        // Crear una nueva fila para el grupo
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td rowspan="1">${prefijoTipo}</td>
            <td rowspan="1">${tipoActivo}</td>
            <td>${codigoInput}</td>
            <td>[${prefijoInput}] ${nombreActivo}</td>
            <td>${valorInput}</td>
            <td>${valoracion}</td>
            <td>${dim_a}</td>
            <td>${dim_c}</td>
            <td>${dim_i}</td>
            <td>${dim_d}</td>
            <td>${dim_t}</td>
            <td>${propietarioInput}</td>
        `;
        tableBody.appendChild(newRow);

        // Registrar la nueva agrupación
        activosRowMap[claveAgrupacion] = {
            rowspanCell: newRow.querySelector("td[rowspan]"),
            tipoCell: newRow.querySelectorAll("td")[1] // Segunda celda: tipo de activo
        };
    }

    // Limpiar el formulario
    document.getElementById("activoForm").reset();
});

const gruposMap = {}; // Mapa para almacenar los rowspans de cada grupo

document.getElementById("agregarAmenaza").addEventListener("click", () => {
    const grupoInput = document.getElementById("grupo").value.trim();
    const codigoAmenazaInput = document.getElementById("codigo_amenaza").value.trim();
    const amenazaInput = document.getElementById("amenaza").value.trim();

    if (!grupoInput || !codigoAmenazaInput || !amenazaInput) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const tableBody = document.querySelector("#amenazasTabla tbody");

    // Crear una nueva fila para la amenaza
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${grupoInput}</td>
        <td>${codigoAmenazaInput}</td>
        <td>${amenazaInput}</td>
        ${crearCheckboxesDimensiones()}
        ${crearCheckboxesActivos()}
    `;
    tableBody.appendChild(newRow);

    // Limpiar formulario
    document.getElementById("amenazaForm").reset();
});

// Función para generar checkboxes de Dimensiones afectadas
function crearCheckboxesDimensiones() {
    const dimensiones = ["A", "C", "I", "D", "T"];
    return dimensiones
        .map(
            (dim) => `
            <td>
                <input type="checkbox" data-dimension="${dim}" />
            </td>
        `
        )
        .join("");
}

// Función para generar checkboxes de Activos afectados
function crearCheckboxesActivos() {
    // Todos los tipos de activos según Magerit
    const activos = [
        "essential", "D", "keys", "S", "arch", "SW", "HW", "Com", "Media", "AUX", "L", "P"
    ];
    return activos
        .map(
            (activo) => `
            <td>
                <input type="checkbox" data-activo="${activo}" />
            </td>
        `
        )
        .join("");
}


// Funcionalidad adicional para capturar estados de los checkboxes
document.querySelector("#amenazasTabla").addEventListener("change", (event) => {
    const target = event.target;
    if (target.type === "checkbox") {
        const dimension = target.getAttribute("data-dimension");
        const activo = target.getAttribute("data-activo");
        const estado = target.checked;

        if (dimension) {
            console.log(
                `Dimensión ${dimension} está ahora ${estado ? "marcada" : "desmarcada"}`
            );
        }

        if (activo) {
            console.log(
                `Activo ${activo} está ahora ${estado ? "marcado" : "desmarcado"}`
            );
        }
    }
});

function llenarTablaAnalisis() {
    const tablaAnalisis = document.querySelector("#analisisTabla tbody");
    const tablaActivos = document.querySelector("#inventarioTabla tbody");
    const tablaAmenazas = document.querySelector("#amenazasTabla tbody");

    // Vaciar la tabla de análisis antes de llenarla
    tablaAnalisis.innerHTML = "";

    let ultimoCodigoAmenaza = ""; // Variable para rastrear el último código de amenaza válido

    // Recorrer cada activo
    Array.from(tablaActivos.querySelectorAll("tr")).forEach((activoRow) => {
        const columnasActivo = activoRow.querySelectorAll("td");
        const codigoActivo = columnasActivo[2]?.textContent.trim() || "";
        const activoNombre = columnasActivo[3]?.textContent.trim() || "";
        const valoracionActivo = columnasActivo[5]?.textContent.trim() || "";
        const valorActivo = columnasActivo[4]?.textContent.trim() || "";
        const tipoActivo = columnasActivo[0]?.textContent.trim() || ""; // Tipo del activo (como 'D', 'SW', etc.)

        console.log(`Procesando activo: ${codigoActivo}, Tipo: ${tipoActivo}`);

        // Recorrer cada amenaza
        Array.from(tablaAmenazas.querySelectorAll("tr")).forEach((amenazaRow) => {
            const columnasAmenaza = amenazaRow.querySelectorAll("td");
            const codigoAmenazaCelda = columnasAmenaza[1];
            const nombreAmenaza = columnasAmenaza[2]?.textContent.trim() || "";

            // Actualizar el último código de amenaza si está presente en la fila actual
            if (codigoAmenazaCelda) {
                ultimoCodigoAmenaza = codigoAmenazaCelda.textContent.trim();
            }

            console.log(`Revisando amenaza: ${ultimoCodigoAmenaza}, Nombre: ${nombreAmenaza}`);

            // Verificar si la amenaza afecta al tipo de activo del activo
            let afectaActivo = false;
            const checkboxes = amenazaRow.querySelectorAll("input[type='checkbox']");

            checkboxes.forEach((checkbox) => {
                const activoAfectado = checkbox.getAttribute("data-activo");
                console.log(`Verificando checkbox: ${activoAfectado}, Marcado: ${checkbox.checked}`);
                if (checkbox.checked && activoAfectado === tipoActivo) {
                    afectaActivo = true;
                }
            });

            // Si la amenaza afecta al activo, generar una fila en la tabla de análisis
            if (afectaActivo) {
                console.log(`La amenaza ${ultimoCodigoAmenaza} afecta al activo ${codigoActivo}`);
                const nuevaFila = document.createElement("tr");
                nuevaFila.innerHTML = `
                    <td>${codigoActivo}</td>
                    <td>${activoNombre}</td>
                    <td>${valoracionActivo}</td>
                    <td>${valorActivo}</td>
                    <td>${ultimoCodigoAmenaza}</td>
                    <td>${nombreAmenaza}</td>
                    <td><input type="text" placeholder="FA, FM, etc." /></td>
                    <td><!-- Vulnerabilidad valor --></td>
                    <td><input type="text" placeholder="C, A, M, etc." /></td>
                    <td><!-- Impacto valor --></td>
                    <td><!-- Riesgo Intrínseco --></td>
                `;
                tablaAnalisis.appendChild(nuevaFila);
            }
        });
    });

    // Actualizar automáticamente los valores de vulnerabilidad, impacto y riesgo
    actualizarVulnerabilidadImpacto();
}

// Función para llenar los valores de vulnerabilidad e impacto automáticamente
function actualizarVulnerabilidadImpacto() {
    const tablaAnalisis = document.querySelector("#analisisTabla tbody");
    const tablaVulnerabilidad = document.querySelector("#vulnerabilidadTabla tbody");
    const tablaImpacto = document.querySelector("#impactoTabla tbody");

    // Iterar por cada fila en la tabla de análisis
    Array.from(tablaAnalisis.querySelectorAll("tr")).forEach((fila) => {
        const celdaVulnerabilidadInput = fila.children[6].querySelector("input"); // Input de valoración vulnerabilidad
        const celdaVulnerabilidadValor = fila.children[7]; // Celda de valor vulnerabilidad
        const celdaImpactoInput = fila.children[8].querySelector("input"); // Input de valoración impacto
        const celdaImpactoValor = fila.children[9]; // Celda de valor impacto
        const celdaRiesgoIntrinseco = fila.children[10]; // Celda de riesgo intrínseco
        const valorActivo = parseFloat(fila.children[3].textContent);

        // Leer prefijos ingresados por el usuario
        const prefijoVulnerabilidad = celdaVulnerabilidadInput.value.trim();
        const prefijoImpacto = celdaImpactoInput.value.trim();

        // Buscar en la tabla de vulnerabilidad
        const filaVulnerabilidad = Array.from(tablaVulnerabilidad.querySelectorAll("tr")).find(
            (filaV) => filaV.children[1].textContent.trim() === prefijoVulnerabilidad
        );

        if (filaVulnerabilidad) {
            const valorVulnerabilidad = parseFloat(filaVulnerabilidad.children[3].textContent.trim());
            celdaVulnerabilidadValor.textContent = valorVulnerabilidad.toFixed(3); // Colocar valor de vulnerabilidad
        } else {
            celdaVulnerabilidadValor.textContent = "N/A"; // Valor no encontrado
        }

        // Buscar en la tabla de impacto
        const filaImpacto = Array.from(tablaImpacto.querySelectorAll("tr")).find(
            (filaI) => filaI.children[1].textContent.trim() === prefijoImpacto
        );

        if (filaImpacto) {
            const valorImpacto = parseFloat(filaImpacto.children[2].textContent.trim().replace('%', '')) / 100;
            celdaImpactoValor.textContent = valorImpacto.toFixed(2); // Colocar valor de impacto
        } else {
            celdaImpactoValor.textContent = "N/A"; // Valor no encontrado
        }

        // Calcular el Riesgo Intrínseco si ambos valores son válidos
        const vulnerabilidadValor = parseFloat(celdaVulnerabilidadValor.textContent);
        const impactoValor = parseFloat(celdaImpactoValor.textContent);

        if (!isNaN(vulnerabilidadValor) && !isNaN(impactoValor)) {
            const riesgoIntrinseco = valorActivo * vulnerabilidadValor * impactoValor;
            celdaRiesgoIntrinseco.textContent = riesgoIntrinseco.toFixed(3);
        } else {
            celdaRiesgoIntrinseco.textContent = "N/A";
        }
    });
}

// Actualizar eventos para actualizar la tabla de análisis
document.querySelector("#analisisTabla").addEventListener("input", actualizarVulnerabilidadImpacto);
document.querySelector("#inventarioTabla").addEventListener("change", llenarTablaAnalisis);
document.querySelector("#amenazasTabla").addEventListener("change", llenarTablaAnalisis);
document.querySelector("#agregarActivo").addEventListener("click", llenarTablaAnalisis);
document.querySelector("#agregarAmenaza").addEventListener("click", llenarTablaAnalisis);


// Llamar una vez para inicializar
llenarTablaAnalisis();

