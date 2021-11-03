<script lang="ts">
    import Header from './Header/Component.svelte'
    import Learn from './Learn/Component.svelte'
    import type { State as LearnState } from './Learn/state'
    import type { State as SettingsState } from './Settings/state'
    import { KATAKANA } from './Learn/alphabets'
    import Finish from './Finish/Component.svelte'
    import Settings from './Settings/Component.svelte'
    import { tick } from 'svelte'

    let learnState: LearnState | undefined
    let settingsState: SettingsState
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
</style>

<main>
    <div class="mx-auto h-screen w-screen bg-white">
        {#if settingsState}
            <Header settingsState="{settingsState}" />
        {/if}
        {#if inLearning}
            {#if !learnState || $learnState === 'learning'}
                <Learn alphabet="{KATAKANA}" bind:state="{learnState}" />
            {:else}
                <Finish
                    on:refresh="{() => {
                        learnState = undefined
                    }}"
                />
            {/if}
        {/if}
        <Settings on:restart="{restart}" bind:state="{settingsState}" />
    </div>
</main>
