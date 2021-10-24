<script lang="ts">
    import TranscriptionInput from "../TranscriptionInput/Component.svelte";
    import { learningState } from './state'

    type Symbol = { symbol: string, transcription: string }
    const KATAKANA: Symbol[] = [
        ['ア', 'a'],
        ['イ', 'i'],
        ['ウ', 'u'],
        ['エ', 'e'],
        ['オ', 'o']
    ].map(([jp, en]) => {
        return { symbol: jp, transcription: en }
    });

    let successHistory: Map<string, number> = new Map()
    let currentLetter: Symbol = getRandomSymbol();
    let gameIsWon: bool = false;
    
    $: success = $learningState === 'success';
    $: failure = $learningState === 'failure';

    learningState.subscribe(value => {
        switch (value) {
            case 'input':
                currentLetter = getRandomSymbol()
                break
            case 'success':
                successHistory.set(currentLetter, (successHistory.get(currentLetter) ?? 0) + 1)
                if (isLearnt()) {
                    gameIsWon = true
                }
                break
            case 'failure':
                successHistory = new Map();
                gameIsWon = false
                break
        }
        console.log(successHistory)
    })


    function getRandomSymbol() {
        return KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
    }
    function isLearnt() {
        return successHistory.size === KATAKANA.length && [...successHistory.values()].every(successes => successes >= 2)
    }

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
    <TranscriptionInput currentTranscription={currentLetter.transcription}/>

    {#if failure}
        <h1> {currentLetter.transcription} </h1>
    {/if}

    {#if gameIsWon }
        <h1> You won!!! </h1>
    {/if}
</div>