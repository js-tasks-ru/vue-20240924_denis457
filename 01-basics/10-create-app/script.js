import { defineComponent, createApp } from 'vue'

const RuDate = defineComponent({
    name: 'RuDate',

    setup() {
        const staticDate = new Date().toLocaleDateString(navigator.language, { dateStyle: 'long' })
        return {
            staticDate
        }
    },

    template: `<div>Сегодня {{ staticDate }}</div>`,
})

const ruDateInstance = createApp(RuDate)
ruDateInstance.mount('#app')
