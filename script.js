// Datos precarcados
const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];

const ventas = [
  // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
  {
    id: 1,
    fecha: new Date(2019, 1, 4),
    nombreVendedora: "Grace",
    sucursal: "Centro",
    componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
  },
  {
    id: 2,
    fecha: new Date(2019, 0, 1),
    nombreVendedora: "Ada",
    sucursal: "Centro",
    componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"],
  },
  {
    id: 3,
    fecha: new Date(2019, 0, 2),
    nombreVendedora: "Grace",
    sucursal: "Caballito",
    componentes: ["Monitor ASC 543", "Motherboard MZI"],
  },
  {
    id: 4,
    fecha: new Date(2019, 0, 10),
    nombreVendedora: "Ada",
    sucursal: "Centro",
    componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"],
  },
  {
    id: 5,
    fecha: new Date(2019, 0, 12),
    nombreVendedora: "Grace",
    sucursal: "Caballito",
    componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"],
  },
];

const articulos = [
  { item: "Monitor GPRS 3000", precio: 200 },
  { item: "Motherboard ASUS 1500", precio: 120 },
  { item: "Monitor ASC 543", precio: 250 },
  { item: "Motherboard ASUS 1200", precio: 100 },
  { item: "Motherboard MZI", precio: 30 },
  { item: "HDD Toyiva", precio: 90 },
  { item: "HDD Wezter Dishital", precio: 75 },
  { item: "RAM Quinston", precio: 110 },
  { item: "RAM Quinston Fury", precio: 230 },
];

const sucursales = ["Centro", "Caballito"];

//***Función reutilizable busca el precio del articulo
const buscarPrecioDelArticulo = (articuloABuscar) => {
  for (const articulo of articulos) {
    if (articuloABuscar == articulo.item) {
      return articulo.precio;
    }
  }
};

//--Lo mismo pero con find:
// const buscarPrecioDelArticuloConFind = (articuloABuscar) =>{
//     return articulos.find((articulo) => articuloABuscar == articulo.item).precio
// }
//***

//1--

// precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

// const precioMaquina = (componentes) =>{
//     let sumaPrecio = 0
//     for (const componente of componentes){
//         sumaPrecio += articulos.find(articulo => articulo.item == componente).precio
//     }
//     return sumaPrecio
// }

//-----Mismo resultado pero reutilizando la funcion buscar precio del articulo (linea 89)

const precioMaquina = (componentes) => {
  let sumaPrecio = 0;
  for (const componente of componentes) {
    sumaPrecio += buscarPrecioDelArticulo(componente);
  }
  return sumaPrecio;
};

// Función que recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.
const cantidadVentasComponente = (componenteABuscar) => {
  let contadorVenta = 0;
  for (const venta of ventas) {
    for (const componente of venta.componentes) {
      if (componenteABuscar == componente) {
        contadorVenta++;
      }
    }
  }
  return contadorVenta;
};

//Resuelto con Filter
// const cantidadVentasComponenteConFilter = (componenteABuscar) =>{
//     let contadorVenta = 0
//     for (const venta of ventas){
//         contadorVenta += venta.componentes.filter(componente => componente == componenteABuscar).length
//     }
//     return contadorVenta
// }

//Función reutilizable, sirve para obtener las ventas dependiendo la fecha
const ventasPorFecha = (mes, anio) => {
  return ventas.filter(
    (venta) =>
      mes - 1 == venta.fecha.getMonth() && anio == venta.fecha.getFullYear()
  );
};

//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const vendedoraDelMes = (mes, anio) => {
  const ventasDelMes = ventasPorFecha(mes, anio);
  const ventasPorVendedora = {};
  for (const venta of ventasDelMes) {
    if (ventasPorVendedora[venta.nombreVendedora] == undefined) {
      ventasPorVendedora[venta.nombreVendedora] = precioMaquina(
        venta.componentes
      );
    } else {
      ventasPorVendedora[venta.nombreVendedora] += precioMaquina(
        venta.componentes
      );
    }
  }

  let vendedoraNombre = "";
  let vendedoraPrecio = 0;
  for (const indice in ventasPorVendedora) {
    if (vendedoraPrecio <= ventasPorVendedora[indice]) {
      vendedoraPrecio = ventasPorVendedora[indice];
      vendedoraNombre = indice;
    }
  }
  return vendedoraNombre;
};

// Función que obtiene las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).
const ventasMes = (mes, anio) => {
  let componentesFiltrados = [];
  const componentesVendidos = ventasPorFecha(mes, anio);
  for (const componenteVendido of componentesVendidos) {
    componentesFiltrados.push(componenteVendido.componentes);
  }
  let componentesFiltradosJoin = componentesFiltrados.join().split(",");

  return precioMaquina(componentesFiltradosJoin);
};

// Función que obtiene las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
  let sumaPrecio = 0;
  for (const venta of ventas) {
    if (venta.nombreVendedora === nombre) {
      sumaPrecio += precioMaquina(venta.componentes);
    }
  }
  return sumaPrecio;
};

// Función que  Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () => {
  let componentesVendidos = [];
  for (const articulo of articulos) {
    componentesVendidos.push({
      cantidad: cantidadVentasComponente(articulo.item),
      nombre: articulo.item,
    });
  }

  let auxiliarCantidad = 0;
  let auxiliarNombre = "";
  for (const componenteVendido of componentesVendidos) {
    if (componenteVendido.cantidad > auxiliarCantidad) {
      auxiliarCantidad = componenteVendido.cantidad;
      auxiliarNombre = componenteVendido.nombre;
    }
  }
  return auxiliarNombre;
};

// Función que indica si hubo ventas en un mes determinado

const huboVentas = (mes, anio) => {
  let bandera = false;
  for (const venta of ventas) {
    if (
      mes - 1 == venta.fecha.getMonth() &&
      anio == venta.fecha.getFullYear()
    ) {
      bandera = true;
      return bandera;
    }
  }
  return bandera;
};

// Función que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
const ventasSucursal = (sucursal) => {
  let totalSucursal = 0;
  for (const venta of ventas) {
    if (venta.sucursal == sucursal) {
      totalSucursal += precioMaquina(venta.componentes);
    }
  }
  return totalSucursal;
};

// Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?
const ventasDos = (propiedad, parametro) => {
  let totalParametro = 0;
  for (const venta of ventas) {
    venta[propiedad] === parametro
      ? (totalParametro += precioMaquina(venta.componentes))
      : (totalParametro = totalParametro);
  }
  return totalParametro;
};

// Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
  const filtroMesAnio = ventas.filter(
    (venta) =>
      mes - 1 == venta.fecha.getMonth() && anio == venta.fecha.getFullYear()
  );
  let totalVentasMayor = 0;
  let sucursalMayor = "";
  for (const sucursal of sucursales) {
    const filtroSucursal = filtroMesAnio.filter(
      (venta) => sucursal == venta.sucursal
    );

    let totalVentas = 0;
    for (const venta of filtroSucursal) {
      totalVentas += precioMaquina(venta.componentes);
    }
    if (totalVentasMayor <= totalVentas) {
      totalVentasMayor = totalVentas;
      sucursalMayor = sucursal;
    }
  }
  return sucursalMayor;
};

//Muestra Ventas por Sucursal
const infoSales = () => {
  document.getElementById("info-sales").innerHTML = sucursales
    .map(function (sucursal) {
      const ventaPorSucursal = ventasSucursal(sucursal);
      return ` <tr>
            <td>${sucursal}</td>
            <td>${ventaPorSucursal}</td>
        </tr>`;
    })
    .join("");
};

infoSales();

// aux //
const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

function openModal($el) {
  $el.classList.add("is-active");
}

function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

// Add a click event on buttons to open a specific modal
(document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);
  console.log($target);

  $trigger.addEventListener("click", () => {
    openModal($target);
  });
});

// Add a click event on various child elements to close the parent modal
(
  document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
  ) || []
).forEach(($close) => {
  const $target = $close.closest(".modal");

  $close.addEventListener("click", () => {
    closeModal($target);
  });
});

// Add a keyboard event to close all modals
document.addEventListener("keydown", (event) => {
  const e = event || window.event;

  if (e.keyCode === 27) {
    // Escape key
    closeAllModals();
  }
});

//Modal nueva venta
const openAddModalButton = document.getElementById("open-add-modal-button"); //ver de ponerlo en una funcion, sino no funciona el modaledit //
const addModal = document.getElementById("add-modal");

openAddModalButton.onclick = () => {
  addModal.style.display = "block";
};

const addModalCancelBtn = document.getElementById("add-modal-cancel-btn");

addModalCancelBtn.onclick = () => {
  addModal.style.display = "none";
};


// Función que brinda la fecha a la tabla de ventas
const parseDateToString = (date) => {
  //01/01/2022
  // 01 -> 01
  // 01-01-2022
  // 15/01/2022
  //  015 -> 15
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${date.getFullYear()}-${month}-${day}`;
};

const parseDateToStringDom = (date) => {
  // 25 025 -> 25
  // 3 03 -> 03
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${day}/${month}/${date.getFullYear()}`;
};

// Mapeo de ventas
const renderVentas = () =>
  (document.getElementById("sales-table").innerHTML = ventas
    .map((venta) => {
      const date = parseDateToStringDom(venta.fecha);
      const price = precioMaquina(venta.componentes);

      return `<tr>
            <td>${date}</td>
            <td>${venta.nombreVendedora}</td>
            <td>${venta.sucursal}</td>
            <td>${venta.componentes.join(" - ")}</td>
            <td>${price}</td>
            <td>
            <i class="fas fa-pencil-alt has-text-success px-3 iconcss is-clickable" onclick="openEditModal(${
              venta.id
            })"></i>
            <i class="far fa-trash-alt has-text-danger px-2 iconcss is-clickable" onclick="openDeleteModal(${
              venta.id
            })"></i>
            </td>
        </tr>`;
    })
    .join(""));

renderVentas();

// Muestra Reportes (productos estrella y vendedora del mes )
const verReportes = () => {
  document.getElementById("product-star").innerHTML =
    componenteMasVendido(ventas);
  document.getElementById("saleswoman-month").innerHTML =
    ventasVendedoraSinFecha(vendedoras);
};

//Muestra nombre vendedora que mas vendió
const ventasVendedoraSinFecha = (vendedoras) => {
  let vendedoraMax = [];
  for (const vendedora of vendedoras) {
    vendedoraMax.push({ nombre: vendedora, total: ventasVendedora(vendedora) });
  }
  let nombreVendedora = "";
  let total = 0;
  for (const vendedora of vendedoraMax) {
    if (vendedora.total >= total) {
      nombreVendedora = vendedora.nombre;
      total = vendedora.total;
    }
  }
  return nombreVendedora;
};

//Esta función actualiza el dom, donde estan renderizados los datos) //
const updateDom = () => {
  infoSales();
  renderVentas();
  verReportes();
};

//Crea una nueva venta //
$("#add-modal-save-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const nombreVendedora = $("#add-modal-sellers").value;
  const fecha = new Date($("#add-modal-date").value);
  const sucursal = $("#add-modal-offices").value;
  const componentes = getOptionSelectedMultiple($("#add-modal-components"));
  const sale = {
    id: generateId(),
    fecha,
    nombreVendedora,
    sucursal,
    componentes,
  };
  ventas.push(sale);
  addModal.style.display = "none";
  updateDom();
});


const generateId = () => Math.ceil(Math.random() * 100_000);

// Función que permite seleccionar mas de un componente
const getOptionSelectedMultiple = (select) => {
  const result = [];
  const options = select && select.options;

  for (const option of options) {
    if (option.selected) {
      result.push(option.value);
    }
  }
  return result;
};

// Función que permite darle funcionalidad multiple a las opciones de los componentes //revisar
const setOptionSelectedMultiple = (element, optionsToSelect) => {
  const options = element.options;
  for (const index in options) {
    const option = options[index];
    if (optionsToSelect.includes(option.value)) {
      option.selected = true;
    }
  }
};

//Función que abre edicion modal //
const openEditModal = (id) => {
  let venta = ventas.find((venta) => venta.id == id);
  $("#editNames").value = venta.nombreVendedora;
  $("#editDate").value = parseDateToString(venta.fecha);
  $("#editOffices").value = venta.sucursal;
  setOptionSelectedMultiple($("#editComponents"), venta.componentes);
  $("#editId").value = venta.id;
  openModal($("#editModal"));
};

//Función que guarda las opciones editadas //
const editBtnModal = $("#edit-modal-save-btn");
editBtnModal.addEventListener("click", () => {
  const id = $("#editId").value;

  const nombreVendedora = $("#editNames").value;
  const fecha = new Date($("#editDate").value);
  const sucursal = $("#editOffices").value;
  const componentes = getOptionSelectedMultiple($("#editComponents"));

  const sale = {
    id,
    fecha,
    nombreVendedora,
    sucursal,
    componentes,
  };

  const index = ventas.findIndex((venta) => venta.id == id);
  ventas[index] = sale;
  updateDom();
});

//Abre modal eliminar //
const openDeleteModal = (id) => {
  $("#deleteId").value = id;
  openModal($("#deleteModal"));
};

//Elimina las ventas//
$("#deleteSale").addEventListener("click", () => {
  const id = $("#deleteId").value;
  const index = ventas.findIndex((venta) => venta.id == id);
  if (index != -1) {
    ventas.splice(index, 1);
  }
  updateDom();
});

//Función que inicializa el proyecto
const initProyect = () => {
  updateDom();
};

initProyect();

//modals-BULMA//
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
});
