<script lang="ts">
    import Header from "./components/Header/Header.svelte";
    import Learn from "./pages/Learn.svelte";

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