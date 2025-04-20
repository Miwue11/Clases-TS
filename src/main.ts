interface Reserva {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

const reservas: Reserva[] = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

const IVA = 1.21;

class CalculadoraReservas {
  constructor(precioSubtotal: number, precioTotal: number) {
    this.precioSubtotal = precioSubtotal;
    this.precioTotal = precioTotal;
  }
  precioSubtotal: number;
  precioTotal: number;
  mostrarPrecio(): void {
    console.log("de momento es gratis... xd");
  }
}
const calcularPrecioPorPersona = (reserva: Reserva): number => {
  let precio = 0;
  switch (reserva.pax) {
    case 1:
      precio = 40;
      break;
    case 2:
      precio = 80;
      break;
    case 3:
      precio = 120;
      break;
    case 4:
      precio = 160;
      break;
    default:
      precio = 0;
      break;
  }
  return precio;
};

const calcularPrecioSubtotalTourOperador = (reserva: Reserva): number => {
  let precio = 0;
  const precioHabitacion = 100;
  const precioDesayuno = reserva.desayuno ? 15 : 0;

  const precioSinIva = (precioHabitacion + precioDesayuno) * reserva.noches;
  const precioTotal = precioSinIva * reserva.noches;
  precio = precioTotal;
  return precio;
};

const calcularPrecioTotalTourOperador = (reserva: Reserva): number => {
  let precio = 0;
  const precioHabitacion = 100;
  const precioDesayuno = reserva.desayuno ? 15 : 0;
  const precioNoche = calcularPrecioPorPersona(reserva);
  const precioConIva =
    (precioHabitacion + precioDesayuno + precioNoche) * reserva.noches * IVA;
  const precioTotal = precioConIva * reserva.noches;
  precio = precioTotal;
  return precio;
};

const calcularPrecioSubTotalParticular = (reserva: Reserva): number => {
  let precio = 0;
  const precioHabitacion = reserva.tipoHabitacion === "standard" ? 100 : 150;
  const precioDesayuno = reserva.desayuno ? 15 : 0;
  const precioSinIva = (precioHabitacion + precioDesayuno) * reserva.noches;
  const precioTotal = precioSinIva * reserva.noches;
  precio = precioTotal;
  return precio;
};

const calcularPrecioTotalParticular = (reserva: Reserva): number => {
  let precio = 0;
  const precioHabitacion = reserva.tipoHabitacion === "standard" ? 100 : 150;
  const precioDesayuno = reserva.desayuno ? 15 : 0;
  const precioNoche = calcularPrecioPorPersona(reserva);
  const precioConIva =
    (precioHabitacion + precioDesayuno + precioNoche) * reserva.noches * IVA;
  const precioTotal = precioConIva * reserva.noches;
  precio = precioTotal;
  return precio;
};

/*CASO 1-->*/ class calculadoraDeParticular extends CalculadoraReservas {
  constructor(reserva: Reserva) {
    super(
      calcularPrecioSubTotalParticular(reserva),
      calcularPrecioTotalParticular(reserva)
    );
    this.precioSubtotal = Math.round(calcularPrecioSubTotalParticular(reserva));
    this.precioTotal = Math.round(calcularPrecioTotalParticular(reserva));
  }
  mostrarPrecio(): void {
    console.log(
      `El precio subtotal es ${this.precioSubtotal} y el precio total es ${this.precioTotal}`
    );
  }
}

/*CASO 2-->*/ class CalculadoraTourOperador extends CalculadoraReservas {
  constructor(reserva: Reserva) {
    super(
      calcularPrecioSubtotalTourOperador(reserva),
      calcularPrecioTotalTourOperador(reserva)
    );
    this.precioSubtotal = Math.round(
      calcularPrecioSubtotalTourOperador(reserva) * 0.85
    );
    this.precioTotal = Math.round(
      calcularPrecioTotalTourOperador(reserva) * 0.85
    );
  }
  mostrarPrecio(): void {
    console.log(
      `El precio subtotal es ${this.precioSubtotal} y el precio total es ${this.precioTotal}`
    );
  }
}

//*********************************//*********************************//

console.log("Calculadora de reservas Particulares");
const reserva1 = new calculadoraDeParticular(reservas[0]);
console.log("reserva 1:");
reserva1.mostrarPrecio();
const reserva2 = new calculadoraDeParticular(reservas[1]);
console.log("reserva 2:");
reserva2.mostrarPrecio();
const reserva3 = new calculadoraDeParticular(reservas[2]);
console.log("reserva 3:");
reserva3.mostrarPrecio();

//*********************************//*********************************//

console.log("Calculadora de reservas Tour Operador");
const reserva4 = new CalculadoraTourOperador(reservas[0]);
console.log("reserva 1:");
reserva4.mostrarPrecio();
const reserva5 = new CalculadoraTourOperador(reservas[1]);
console.log("reserva 2:");
reserva5.mostrarPrecio();
const reserva6 = new CalculadoraTourOperador(reservas[2]);
console.log("reserva 3:");
reserva6.mostrarPrecio();
