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

type insumosFiltros = {
    busqueda: string,
    idSubCatProd: number,
    idTipoProducto: number
}

export type porcinosPagination = {
    paginacion: pagination,
    filtros: filtros,
}

export type insumosPagination = {
    paginacion: pagination,
    filtros: insumosFiltros,
}

export type CreateEjemplar = {
    codigo: string,
    sexo: string,
    idEtapaPorcinoActual: number,
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

export type Ejemplar = {
    cantidadPezones: number | null
    caracteristicas: string,
    codigo: string,
    createdAt: string,
    createdBy: string,
    estado: boolean
    fechaIngreso: string,
    fechaNacimiento: string,
    idCerdo: number,
    idCorralActual: number,
    idEtapaPorcinoActual: number,
    idLote: number | null,
    idMadre: number | null,
    idPadre: number | null,
    idRaza: number,
    idTipoCerdo: number,
    imgUrl: string,
    nPartos: null
    nombre: string,
    origen: string,
    pesoActual: string,
    pesoNacimiento: string,
    sexo: string,
    updatedAt: string,
    updatedBy: string,
}

export type ItemsCombobox = {
    id: number,
    codigo: string,
    nombre: string,
}

export type Producto = {
    idProducto: number;
    cantidadUmVenta: string;
    cantidadUmCompra: number;
    codigo: string;
    nombre: string;
    precio: string;
    costo: string;
    cantidadTotal: string;
    cantidadMinima: string;
    imgUrl: string;
    observaciones: string | null;
    estado: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    idSubCatProd: number;
    idTipoProducto: number;
    idUnidadMedidaCompra: number;
    idUnidadMedidaVenta: number;
}

export type CreateProducto = {
    codigo: string,
    nombre: string,
    cantidadUmVenta: string,
    cantidadUmCompra: number,
    precio: string,
    costo: string,
    cantidadTotal: string,
    cantidadMinima: string,
    imgUrl: string,
    observaciones: string,
    estado: boolean,
    idSubCatProd: number,
    idTipoProducto: number,
    idUnidadMedidaCompra: number,
    idUnidadMedidaVenta: number
}