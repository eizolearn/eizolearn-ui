<script lang="ts">
    import type { Settings } from './Settings/settings'
    import type { State as SettingsState } from './Settings/state'
    import Alphabets from './Alphabet/alphabet'
    import SettingsComponent from './Settings/Component.svelte'
    import Header from './Header/Component.svelte'
    import Learn from './Learn/Component.svelte'
    import Finish from './Finish/Component.svelte'
    import { tick } from 'svelte'

    let settings: Settings | undefined
    let settingsState: SettingsState | undefined
    let inLearning = true

    const restart = async () => {
        inLearning = false
        await tick()
        inLearning = true
    }
</script>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    :global(html),
    :global(body) {
        height: 100%;
    }
</style>

<main>
    <div class="mx-auto h-full w-screen bg-white">
        {#if settingsState}
            <Header settingsState="{settingsState}" />
        {/if}

        {#if inLearning && settings}
            <Learn
                alphabet="{Alphabets.KATAKANA.english}"
                settings="{settings}"
                on:learnt="{() => {
                    inLearning = false
                }}"
            />
        {:else}
            <Finish
                on:refresh="{() => {
                    inLearning = true
                }}"
            />
        {/if}

        <SettingsComponent on:restart="{restart}" bind:state="{settingsState}" bind:settings />
    </div>
</main>
