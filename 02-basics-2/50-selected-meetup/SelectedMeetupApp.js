import { computed, defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const sortedMeetupIds = Array.from({ length: 5 }, (_, x) => x + 1)
    const minId = sortedMeetupIds[0]
    const maxId = sortedMeetupIds[sortedMeetupIds.length - 1]

    const selectedMeetupId = ref(1)

    const selectedMeetupData = ref({})

    const meetupIdInfos = computed(() => {
      return sortedMeetupIds.map((value) => {
        return {
          idValue: value,
          checked: selectedMeetupId.value === value,
        }
      })
    })

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
      meetupIdInfos,
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
          <div class="radio-group__button" v-for="{ idValue, checked } in meetupIdInfos">
            <input
              :id="\`meetup-id-\${idValue}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="idValue"
              v-model="selectedMeetupId"
              :checked="checked"
            />
            <label :for="\`meetup-id-\${idValue}\`" class="radio-group__label">{{ idValue }}</label>
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
