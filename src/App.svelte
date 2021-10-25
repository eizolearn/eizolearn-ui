<script lang="ts">
    import Header from './Header/Component.svelte'
    import Learn from './Learn/Component.svelte'
    import type { State as LearnState } from './Learn/state'
    import { KATAKANA } from './Learn/alphabets'
    import Finish from './Finish/Component.svelte'

    let learnState: LearnState
</script>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

<main>
    <div class="mx-auto h-screen w-screen bg-white">
        <Header />
        {#if !learnState || $learnState === 'learning'}
            <Learn alphabet="{KATAKANA}" bind:state="{learnState}" />
        {:else}
            <Finish on:refresh="{() => (learnState = undefined)}" />
        {/if}
    </div>
</main>
