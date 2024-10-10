import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const num1 = ref(0)
    const num2 = ref(0)
    const selectedOperator = ref(null)

    const OPERATOR_VALUE = {
      SUM: 'sum',
      SUBTRACT: 'subtract',
      MULTIPLY: 'multiply',
      DIVIDE: 'divide',
    }

    const operators = [
      {
        value: OPERATOR_VALUE.SUM,
        icon: '➕'
      },
      {
        value: OPERATOR_VALUE.SUBTRACT,
        icon: '➖'
      },
      {
        value: OPERATOR_VALUE.MULTIPLY,
        icon: '✖'
      },
      {
        value: OPERATOR_VALUE.DIVIDE,
        icon: '➗'
      },
    ]

    const result = computed(() => {
      let result = 0
      switch(selectedOperator.value) {
        case(OPERATOR_VALUE.SUM):
          result = num1.value + num2.value
          break
        case(OPERATOR_VALUE.SUBTRACT):
          result = num1.value - num2.value
          break
        case(OPERATOR_VALUE.MULTIPLY):
          result = num1.value * num2.value
          break
        case(OPERATOR_VALUE.DIVIDE):
          result = num1.value / num2.value
          break
        default:
          result = 0
      }
      return result
    })

    function handleOperatorChange(operatorValue) {
      selectedOperator.value = operatorValue
    }

    return {
      num1,
      num2,
      selectedOperator,
      operators,
      result,
      handleOperatorChange,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="num1" />

      <div class="calculator__operators">
        <template v-for="operator in operators">
        <label><input type="radio" name="operator" :value="operator.value" :checked="selectedOperator == operator.value" @input="handleOperatorChange(operator.value)"/>{{ operator.icon }}</label>
        </template>
      </div>

      <input type="number" aria-label="Second operand" v-model="num2" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
