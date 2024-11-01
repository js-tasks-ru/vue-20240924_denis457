import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0)

    function increment() {
      counter.value++
    }

    function decrement() {
      counter.value--
    }

    const disabledIncrement = computed(()=> {
      return counter.value >= 5
    })

    const disabledDecrement = computed(()=> {
      return counter.value <= 0
    })

    return {
      counter,
      increment,
      decrement,
      disabledIncrement,
      disabledDecrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrement"
        :disabled="disabledDecrement"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="increment"
        :disabled="disabledIncrement"
      >➕</button>
    </div>
  `,
})
