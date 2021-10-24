<script lang="ts">
    import { onMount } from 'svelte'
    import type { TranscripedSymbol, TranscripedAlphabet } from './alphabets'
    import { constructState } from './state'
    import TranscriptionInput from '../TranscriptionInput/Component.svelte'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'

    export let alphabet: TranscripedAlphabet
    export const state = constructState(alphabet)

    let inputState: TranscriptionInputState
    let currentLetter: TranscripedSymbol = alphabet.getRandom()

    $: success = $inputState === 'success'
    $: failure = $inputState === 'failure'

    onMount(() => {
        inputState.subscribe(value => {
            if (value === 'input') {
                currentLetter = alphabet.getRandom()
            } else if (value === 'success') {
                state.hit(currentLetter.symbol)
            } else if (value === 'failure') {
                state.miss()
            }
        })
    })
</script>

<style>
    .success {
        @apply bg-success;
    }
    .failure {
        @apply bg-failure;
    }
</style>

<div class="flex flex-col justify-center items-center text-primary mx-auto object-contain" class:success class:failure>
    <span class="text-symbol">{currentLetter.symbol}</span>
    <TranscriptionInput currentTranscription="{currentLetter.transcription}" bind:inputState />

    {#if failure}
        <h1>{currentLetter.transcription}</h1>
    {/if}

    {#if $state === 'learnt'}
        <h1>You won!!!</h1>
    {/if}
</div>
