type pagination = {
    pagina: number,
    porPagina: number,
    ordenarPor: string | null,
    ordenarDir: string | null,
}

type filtros = {
    idLote: number,
    idRaza: number,
}

export type porcinosPagination = {
    paginacion: pagination,
    filtros: filtros,
}

export type CreateEjemplar = {
    codigo: string,
    sexo: string,
    idEtapaPorcinoActual: 0,
    origen: string,
    nombre: string,
    caracteristicas: string,
    fechaIngreso: string,
    fechaNacimiento: string,
    cantidadPezones: number,
    nPartos: number,
    pesoNacimiento: number,
    pesoActual: number,
    estado: boolean,
    idCorralActual: number,
    idLote: number,
    idMadre: number,
    idPadre: number,
    idRaza: number,
    idTipoCerdo: number
}

export type ItemsCombobox = {
    id: number,
    codigo: string,
    nombre: string,
}