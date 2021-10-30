<script lang="ts">
    import Enter from './enter.svg'
    import CheckMark from './checkmark.svg'
    import Cross from './cross.svg'
    import SkippedCross from './skipped.svg'
    import { constructState } from './state'

    const MAX_INPUT_LENGTH = 5

    export let currentTranscription: string
    export const inputState = constructState()

    let transcriptionInput = ''
    let maxLength = MAX_INPUT_LENGTH

    $: isFailure = $inputState === 'failure' || $inputState === 'skipped'
    $: (() => {
        if (transcriptionInput.toLocaleLowerCase().trim() === currentTranscription) {
            maxLength = transcriptionInput.length
            inputState.succeed()
        } else if (transcriptionInput.length > maxLength) {
            transcriptionInput = transcriptionInput.substring(0, maxLength)
        }
    })()

    $: if ($inputState === 'input') {
        maxLength = MAX_INPUT_LENGTH
    }

    inputState.subscribe(value => {
        if (value === 'input') {
            transcriptionInput = ''
        }
    })

    const keyPress = (event: KeyboardEvent) => {
        if ($inputState === 'input' && (event.code === 'Enter' || event.key === 'Enter')) {
            maxLength = transcriptionInput.length
            if (transcriptionInput.trim() === '') {
                inputState.skipped()
            } else {
                inputState.fail()
            }
        }
    }
</script>

<style>
    .isFailure {
        @apply line-through;
    }
</style>

<div class="flex items-center bg-white rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <input
        bind:value="{transcriptionInput}"
        on:keyup="{keyPress}"
        size="4"
        maxlength="{maxLength}"
        class="m-1 ml-4 round flex-grow text-center focus:outline-none bg-white"
        class:isFailure
    />

    {#if $inputState === 'input'}
        <Enter class="mr-1" />
    {:else if $inputState === 'success'}
        <CheckMark class="mr-1" />
    {:else if $inputState === 'skipped'}
        <SkippedCross class="mr-1" />
    {:else if $inputState === 'failure'}
        <Cross class="mr-1" />
    {/if}
</div>
