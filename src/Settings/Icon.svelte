<script lang="ts">
    import type { State as SettingsState } from '../Settings/state'
    import CloseIcon from './close-icon.svg'
    import SettingsIcon from './settings-icon.svg'

    export let state: SettingsState
</script>

<span class="cursor-pointer {$$props.class}">
    {#if $state === 'close'}
        <span on:click="{() => state.open()}"> <SettingsIcon /> </span>
    {:else}
        <span on:click="{() => state.close()}"> <CloseIcon /> </span>
    {/if}
</span>
