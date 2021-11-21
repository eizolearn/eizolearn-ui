<script lang="ts">
    export let name: string
    export let group: string
    export let value: string
</script>

<style>
    .translateY {
        transform: translateY(-0.075em);
    }
</style>

<label class="flex items-center">
    <input
        type="radio"
        class="translateY rounded-full checked:bg-secondary w-5 h-5 mr-2 appearance-none border-2 border-secondary border-solid"
        bind:group
        name="{name}"
        value="{value}"
    />
    <slot />
</label>
