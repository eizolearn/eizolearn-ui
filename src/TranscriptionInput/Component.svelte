<script lang="ts">
    import Enter from './enter.svg'
    import CheckMark from './checkmark.svg'
    import Cross from './cross.svg'
    import { constructState } from './state'

    export let currentTranscription: string
    export const inputState = constructState()

    let inputField: { value: string }
    let transcriptionInput = ''

    $: failure = $inputState === 'failure'

    inputState.subscribe(value => {
        if (value === 'input' && inputField) {
            inputField.value = ''
        }
    })

    const checkTranscription = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            if (transcriptionInput.toLocaleLowerCase() === currentTranscription) {
                inputState.succeed()
            } else {
                inputState.fail()
            }
        }
    }
</script>

<style>
    .failure {
        @apply line-through;
    }
</style>

<div class="flex items-center rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <input
        bind:this="{inputField}"
        bind:value="{transcriptionInput}"
        on:keyup="{checkTranscription}"
        size="4"
        maxlength="5"
        class="round flex-grow text-center focus:outline-none"
        class:failure
    />

    {#if $inputState === 'input'}
        <Enter class="mr-1" />
    {:else if $inputState === 'success'}
        <CheckMark class="mr-1" />
    {:else if failure}
        <Cross class="mr-1" />
    {/if}
</div>
