import { defineStore } from "pinia";
import JWTDecoder, { type CustomJwtPayload } from "./common/utils/jwtDecoder";

export const useStore = defineStore('store', {
    state: () => ({
        access_token: '',
    }),

    getters: {
        decode(state): CustomJwtPayload | null {
            if(!state.access_token) return null

            try {
                return new JWTDecoder(state.access_token).decodeToken()
            } catch (error) {
                return null
            }
        },

        accessToken(state): string | null {
            if (!state.access_token) return null;

            try {
                return state.access_token
            } catch (e) {
                return null
            }
        },

        nameUser(): string {
            return this.decode?.username ?? ''
        },

        expMs(): number {
            return this.decode?.exp ? this.decode.exp * 1000 : 0
        },

        isExpired(): boolean {
            return this.expMs ? Date.now() >= this.expMs : false
        },

        isLoggedIn(): boolean {
            return  this.decode !== null
        },
    },

    actions: {
        login(token: string) {
            this.access_token = token
        },

        logout() {
            this.access_token = ''
        },

    },

    persist: {
        key: 'store',
    }
})