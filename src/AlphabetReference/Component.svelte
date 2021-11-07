<script lang="ts">
    import { groupBy } from '../utils/functional'
    import type { TranscripedAlphabet, TranscripedSymbol } from '../Alphabet/alphabet'
    import { constructState, State as AlphabetReferenceState } from './state'
    import Close from './close-icon.svg'

    export let alphabet: TranscripedAlphabet
    export let state: AlphabetReferenceState = constructState()

    $: groupedAlphabet = Object.values(groupBy(alphabet.letters, symbol => symbol.displayPositioning.y))
    function padSymbols(symbols: TranscripedSymbol[]): (TranscripedSymbol | undefined)[] {
        return Object.values({
            0: undefined,
            1: undefined,
            2: undefined,
            3: undefined,
            4: undefined,
            ...Object.fromEntries(symbols.map(symbol => [symbol.displayPositioning.x, symbol])),
        })
    }
</script>

{#if $state === 'open'}
    <div class="font-nunito bg-primary absolute z-10 h-page w-screen overflow-scroll">
        <div class="flex flex-col gap-5 max-w-xl m-auto text-secondary pb-4">
            {#each groupedAlphabet as symbols}
                <div class="flex w-full justify-around">
                    {#each padSymbols(symbols) as symbol}
                        <div class="flex flex-col text-center">
                            <span class="text-reference-symbol">{symbol?.symbol ?? ''}</span>
                            <span class="text-reference-transcription">{symbol?.displayedTranscription ?? ''}</span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
        <div class="items-center sticky bottom-0 bg-primary">
            <div
                class="h-max w-max m-auto"
                on:click="{() => {
                    state.close()
                }}"
            >
                <Close />
            </div>
        </div>
    </div>
{/if}
