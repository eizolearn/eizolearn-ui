<script lang="ts">
    import TranscriptionInput from "../TranscriptionInput/Component.svelte";
    import { learningState } from './state'

    type Symbol = { symbol: string, transcription: string }
    const KATAKANA: Symbol[] = [
        ['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o'],
        ['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'hu'], ['ヘ', 'he'], ['ホ', 'ho'],
        ['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo'],
        ['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po'],
        ['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko'],
        ['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go'],
        ['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to'],
        ['ダ', 'da'], ['ヂ', 'di'], ['ヅ', 'du'], ['デ', 'de'], ['ド', 'do'],
        ['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so'],
        ['ザ', 'za'], ['ジ', 'zi'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo'],
        ['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no'],
        ['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo'],
        ['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro'],
        ['ワ', 'wa'], ['ヰ', 'wi'], ['ヲ', 'wo'], ['ヤ', 'ya'], ['ユ', 'yu'],
        ['ヨ', 'yo'], ['ン', 'n'], ['ヷ', 'va'], ['ヸ', 'vi'], ['ヴ', 'vu'],
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