// 1. Programación Funcional en JavaScript
// Currying para calcular el costo total de los servicios
const calcularCosto = (precioPorConsulta) => (numeroDeConsultas) => precioPorConsulta * numeroDeConsultas;

// Función flecha para calcular el tiempo promedio de espera
const calcularPromedioEspera = (tiemposDeEspera) => tiemposDeEspera.reduce((total, tiempo) => total + tiempo, 0) / tiemposDeEspera.length;

// Recursión para calcular las horas totales de consulta
const calcularHorasTotales = (horas, dias = 0) => {
    if (dias === horas.length) return 0;
    return horas[dias] + calcularHorasTotales(horas, dias + 1);
};

// Composición de funciones para aplicar descuentos
const aplicarDescuento = (costo, descuento) => costo - descuento;
const calcularCostoConDescuento = (numeroConsultas, precioPorConsulta, descuento) =>
    aplicarDescuento(calcularCosto(precioPorConsulta)(numeroConsultas), descuento);


// 2. Programación Orientada a Eventos y Asíncrona

// Captura del evento del formulario en la página de contacto
document.addEventListener('DOMContentLoaded', () => {
    const formularioContacto = document.querySelector('form');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Formulario enviado correctamente. ¡Gracias por contactarnos!');
        });
    }

    // Evento personalizado: llegada de un nuevo paciente
    const notificarNuevoPaciente = new CustomEvent('nuevoPaciente', {
        detail: { nombre: 'Nuevo Paciente', mensaje: 'Un nuevo paciente ha llegado.' }
    });

    document.addEventListener('nuevoPaciente', (e) => {
        alert(`${e.detail.nombre}: ${e.detail.mensaje}`);
    });

    // Simular la llegada de un paciente después de 3 segundos
    setTimeout(() => {
        document.dispatchEvent(notificarNuevoPaciente);
    }, 3000);
});

// Función asíncrona para simular una API REST con try/catch y manejo de errores
const obtenerDoctores = async () => {
    try {
        const response = await new Promise((resolve, reject) => {
            // Simulación de API: resolver o rechazar después de 2 segundos
            setTimeout(() => {
                const success = true; // Cambia a false para probar el error
                success ? resolve(['Dr. Pérez', 'Dr. López', 'Dr. González']) : reject('Error al obtener los datos');
            }, 2000);
        });

        // Mostrar doctores en la página
        const doctoresContainer = document.getElementById('doctores2-info');
        doctoresContainer.innerHTML = `<ul>${response.map(doctor => `<li>${doctor}</li>`).join('')}</ul>`;
    } catch (error) {
        console.error(error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = error;
    }
};

// Llamar a la función al cargar la página
obtenerDoctores();

// Clase Doctor
class Doctor {
    constructor(nombre, especialidad, añosExperiencia) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        let _añosExperiencia = añosExperiencia; // Propiedad encapsulada

        // Getter para años de experiencia
        this.getAñosExperiencia = () => _añosExperiencia;

        // Setter para años de experiencia
        this.setAñosExperiencia = (nuevosAños) => {
            if (nuevosAños >= 0) {
                _añosExperiencia = nuevosAños;
            } else {
                console.error('Los años de experiencia no pueden ser negativos.');
            }
        };
    }

    // Método para mostrar la información del doctor
    mostrarInformacion() {
        return `Dr. ${this.nombre} - Especialidad: ${this.especialidad}, Años de experiencia: ${this.getAñosExperiencia()}`;
    }

    // Método para calcular el total de pacientes atendidos
    calcularPacientesAtendidos(diasLaborales, pacientesPorDia) {
        return diasLaborales * pacientesPorDia;
    }
}

// Subclase Cirujano que extiende de Doctor
class Cirujano extends Doctor {
    constructor(nombre, especialidad, añosExperiencia, especialidadCirugia) {
        super(nombre, especialidad, añosExperiencia);
        this.especialidadCirugia = especialidadCirugia;
    }

    // Sobrescritura del método calcularPacientesAtendidos
    calcularPacientesAtendidos(diasLaborales, operacionesPorDia) {
        return diasLaborales * operacionesPorDia;
    }

    // Método específico de Cirujano
    mostrarInformacion() {
        return `Dr. ${this.nombre} - Especialidad: ${this.especialidad} (Cirugía: ${this.especialidadCirugia}), Años de experiencia: ${this.getAñosExperiencia()}`;
    }
}

// Ejemplo de uso
document.addEventListener('DOMContentLoaded', () => {
    // Crear un doctor
    const doctor1 = new Doctor('Juan Pérez', 'Medicina General', 10);
    console.log(doctor1.mostrarInformacion());
    console.log('Pacientes atendidos por semana:', doctor1.calcularPacientesAtendidos(5, 8));

    // Crear un cirujano
    const cirujano1 = new Cirujano('Ana López', 'Traumatología', 15, 'Ortopedia');
    console.log(cirujano1.mostrarInformacion());
    console.log('Operaciones realizadas por semana:', cirujano1.calcularPacientesAtendidos(5, 3));
});
