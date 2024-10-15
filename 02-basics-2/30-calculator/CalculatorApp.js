import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const num1 = ref(0)
    const num2 = ref(0)
    const selectedOperatorCode = ref(undefined)

    const OPERATOR_CODE = {
      SUM: 'sum',
      SUBTRACT: 'subtract',
      MULTIPLY: 'multiply',
      DIVIDE: 'divide',
    }

    const operators = {
      [OPERATOR_CODE.SUM]: {
        sign: '+',
        icon: '➕',
      },

      [OPERATOR_CODE.SUBTRACT]: {
        sign: '-',
        icon: '➖',
      },

      [OPERATOR_CODE.MULTIPLY]: {
        sign: '*',
        icon: '✖',
      },

      [OPERATOR_CODE.DIVIDE]: {
        sign: '/',
        icon: '➗',
      },
    }

    const result = computed(() => {
      const num1Value = num1.value
      const num2Value = num2.value
      const operatorSign = selectedOperatorCode.value ? operators[selectedOperatorCode.value].sign : undefined
      return operatorSign ? eval(`${num1Value} ${operatorSign} ${num2Value}`) : 0
    })

    return {
      num1,
      num2,
      selectedOperatorCode,
      operators,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="num1" />

      <div class="calculator__operators">
        <template v-for="(operator, operatorCode) in operators">
        <label><input type="radio" name="operator" :value="operatorCode" v-model="selectedOperatorCode" :checked="selectedOperatorCode == operatorCode"/>{{ operator.icon }}</label>
        </template>
      </div>

      <input type="number" aria-label="Second operand" v-model="num2" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
