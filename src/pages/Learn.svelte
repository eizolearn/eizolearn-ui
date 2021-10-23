<script lang="ts">
    import TranscriptionInput from "../components/TranscriptionInput/TranscriptionInput.svelte";
    import { learningState } from '../components/learningState.ts'

    type Symbol = { symbol: string, transcription: string }
    const KATAKANA: [Symbol] = [
        ['ア', 'a'],
        ['イ', 'i'],
        ['ウ', 'y'],
        ['エ', 'e'],
        ['オ', 'o']
    ].map(([jp, en]) => {
        return { symbol: jp, transcription: en }
    });
    let successHistory: Map<string, number> = new Map()
    let currentLetter: Symbol = getRandomSymbol();

    $: isLearnt = () => successHistory.size === KATAKANA.length && [...successHistory.values()].every(successes => successes >= 2)
    $: failed = $learningState === 'failure';


    function getRandomSymbol() {
        return KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
    }
</script>

<style>
    .failed {
        @apply bg-failure
    }
</style>

<div class="flex flex-col justify-center items-center text-primary mx-auto object-contain" class:failed>
    <span class="text-symbol">{currentLetter.symbol}</span>
    <TranscriptionInput />
</div>