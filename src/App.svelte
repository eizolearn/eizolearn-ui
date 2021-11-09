<script lang="ts">
    import Header from './Header/Component.svelte'
    import Learn from './Learn/Component.svelte'
    import type { State as LearnState } from './Learn/state'
    import type { Settings } from './Settings/settings'
    import type { State as SettingsState } from './Settings/state'
    import Alphabets from './Alphabet/alphabet'
    import Finish from './Finish/Component.svelte'
    import SettingsComponent from './Settings/Component.svelte'
    import { tick } from 'svelte'

    let learnState: LearnState | undefined
    let settings: Settings | undefined
    let settingsState: SettingsState | undefined
    let inLearning = true

    const restart = async () => {
        inLearning = false
        learnState = undefined
        await tick()
        inLearning = true
    }
</script>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

<main>
    <div class="mx-auto h-screen w-screen bg-white">
        {#if settingsState}
            <Header settingsState="{settingsState}" />
        {/if}
        {#if inLearning && !!settings}
            {#if !learnState || $learnState === 'learning'}
                <Learn alphabet="{Alphabets.KATAKANA.english}" settings="{settings}" bind:state="{learnState}" />
            {:else}
                <Finish
                    on:refresh="{() => {
                        learnState = undefined
                    }}"
                />
            {/if}
        {/if}
        <SettingsComponent on:restart="{restart}" bind:state="{settingsState}" bind:settings />
    </div>
</main>
