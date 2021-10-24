<script lang="ts">
    import Header from "./Header/Component.svelte";
    import Learn from "./Learn/Component.svelte";

</script>

<main>
    <div class="mx-auto h-screen w-screen bg-white">
        <Header />
        <Learn />
    </div>
</main>

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
