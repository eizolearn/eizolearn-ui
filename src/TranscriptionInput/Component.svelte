<script lang="ts">
    import Enter from './enter.svg'
    import CheckMark from './checkmark.svg'
    import Cross from './cross.svg'
    import SkippedCross from './skipped.svg'
    import { constructState } from './state'
    import { onMount } from 'svelte'

    export let currentTranscription: string
    export const inputState = constructState()

    let inputField //TODO typization
    let transcriptionInput = ''
    let maxLength = 5

    $: isFailure = $inputState === 'failure' || $inputState === 'skipped'
    $: if (transcriptionInput.toLocaleLowerCase().trim() === currentTranscription) {
        maxLength = transcriptionInput.length
        inputState.succeed()
    }

    $: if (inputField && $inputState === 'input') {
        maxLength = 5
    }

    inputState.subscribe(value => {
        if (value === 'input' && inputField) {
            transcriptionInput = ''
        }
    })

    const keyPress = (event: KeyboardEvent) => {
        if (transcriptionInput.length > maxLength) {
            transcriptionInput = transcriptionInput.substring(0, maxLength)
        }
        if (event.code === 'Enter' || event.key === 'Enter') {
            checkTranscription()
        }
    }

    const checkTranscription = () => {
        maxLength = transcriptionInput.length
        if (transcriptionInput.toLocaleLowerCase().trim() === currentTranscription) {
            inputState.succeed()
        } else if (transcriptionInput.trim() === '') {
            console.log('skipped')
            inputState.skipped()
        } else {
            inputState.fail()
        }
    }
    onMount(() => {
        maxLength = 5
    })
</script>

<style>
    .isFailure {
        @apply line-through;
    }
</style>

<div class="flex items-center bg-white rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <input
        bind:this="{inputField}"
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
