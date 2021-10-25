<script lang="ts">
    import Header from './Header/Component.svelte'
    import Learn from './Learn/Component.svelte'
    import { KATAKANA } from './Learn/alphabets'
</script>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>

<main>
    <div class="mx-auto h-screen w-screen bg-white">
        <Header />
        <Learn alphabet="{KATAKANA}" />
    </div>
</main>
