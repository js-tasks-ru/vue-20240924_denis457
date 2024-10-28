import { computed, defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupIdSequence = Array.from({ length: 5 }, (_, x) => x + 1)
    const minId = meetupIdSequence[0]
    const maxId = meetupIdSequence[meetupIdSequence.length - 1]

    const selectedMeetupId = ref(1)

    const selectedMeetupData = ref({})

    watch(selectedMeetupId, (id) => {
      getMeetup(id).then((meetupData) => {
        selectedMeetupData.value = meetupData
      })
    }, { immediate: true })

    const availablePreviousButton = computed(() => {
      return selectedMeetupId.value > minId
    })

    const availableNextButton = computed(() => {
      return selectedMeetupId.value < maxId
    })

    function handlePreviousButtonClick() {
      selectedMeetupId.value--
    }

    function handleNextButtonClick() {
      selectedMeetupId.value++
    }

    return {
      meetupIdSequence,
      selectedMeetupId,
      selectedMeetupData,
      availablePreviousButton,
      availableNextButton,
      handlePreviousButtonClick,
      handleNextButtonClick,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="!availablePreviousButton" @click="handlePreviousButtonClick">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="id in meetupIdSequence">
            <input
              :id="\`meetup-id-\${id}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="id"
              v-model="selectedMeetupId"
            />
            <label :for="\`meetup-id-\${id}\`" class="radio-group__label">{{ id }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="!availableNextButton" @click="handleNextButtonClick">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ selectedMeetupData.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
