export interface Login {
    usuario: string;
    password: string
}


export interface DataUserToken {
    name?: string
    usuario?: string
    permisos: number[]
    modulos: number[]
}

export interface ListarEjemplares {
    exito: true
    datos: []
    meta: {
        total: number
        pagina: number
        porPagina: number
    }
}