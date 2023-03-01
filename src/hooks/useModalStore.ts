import { defineStore} from 'pinia'
import { ref } from 'vue'
export const useModalStore = defineStore('modal', {
    state() {
        return {
            visible: false
        }
    },
    actions: {
        toggle() {
            this.$state.visible = !this.$state.visible
            
        }
    }
})