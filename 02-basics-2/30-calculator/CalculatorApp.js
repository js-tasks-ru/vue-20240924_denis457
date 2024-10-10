import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const num1 = ref(0)
    const num2 = ref(0)
    const selectedOperator = ref({})

    const OPERATOR_VALUE = {
      SUM: 'sum',
      SUBTRACT: 'subtract',
      MULTIPLY: 'multiply',
      DIVIDE: 'divide',
    }

    const operators = [
      {
        value: OPERATOR_VALUE.SUM,
        sign: '+',
        icon: '➕',
      },
      {
        value: OPERATOR_VALUE.SUBTRACT,
        sign: '-',
        icon: '➖',
      },
      {
        value: OPERATOR_VALUE.MULTIPLY,
        sign: '*',
        icon: '✖',
      },
      {
        value: OPERATOR_VALUE.DIVIDE,
        sign: '/',
        icon: '➗',
      },
    ]

    const result = computed(() => {
      const num1Value = num1.value
      const num2Value = num2.value
      const operatorSign = selectedOperator.value.sign
      return num1Value && num2Value && operatorSign ? eval(`${num1Value} ${operatorSign} ${num2Value}`) : 0
    })

    function handleOperatorChange(operator) {
      selectedOperator.value = operator
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
        <label><input type="radio" name="operator" :value="operator.value" :checked="selectedOperator.value == operator.value" @input="handleOperatorChange(operator)"/>{{ operator.icon }}</label>
        </template>
      </div>

      <input type="number" aria-label="Second operand" v-model="num2" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
