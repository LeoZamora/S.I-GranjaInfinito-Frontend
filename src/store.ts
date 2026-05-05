import { defineStore } from "pinia";
import JWTDecoder, { type CustomJwtPayload } from "./common/utils/jwtDecoder";

export const useStore = defineStore('store', {
    state: () => ({
        token: '',
    }),

    getters: {
        decode(state): CustomJwtPayload | null {
            if(!state.token) return null

            try {
                return new JWTDecoder(state.token).decodeToken()
            } catch (error) {
                return null
            }
        },

        expMs(): number {
            return this.decode?.exp ? this.decode.exp * 1000 : 0
        },

        isExpired(): boolean {
            return this.expMs ? Date.now() >= this.expMs : false
        },

        isLoggedIn(): boolean {
            const valid = this.decode === null ? false : true

            return valid
        },
    },

    actions: {
        login(token: string) {
            this.token = token
        },

        logout() {
            this.token = ''
        },

        ensureSessionValid() {
            if (this.isExpired) {
                this.logout()
                return false
            }

            return true
        },

    },

    persist: {
        key: 'store',
    }
})