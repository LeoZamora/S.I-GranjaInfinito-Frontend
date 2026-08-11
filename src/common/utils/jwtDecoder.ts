import { jwtDecode } from "jwt-decode"

export interface CustomJwtPayload {
    name?: string
    username: string
    rolId: number
    permisos: number[]
    iss?: string
    sub?: string
    aud?: string[] | string
    exp?: number
    nbf?: number
    iat?: number
    jti?: string
}

class JWTDecoder {
    token: string | null

    constructor(token: string | null) {
        this.token = token
    }

    decodeToken(): CustomJwtPayload | null {
        if (!this.token) return null

        return jwtDecode<CustomJwtPayload>(this.token)
    }
}

export default JWTDecoder