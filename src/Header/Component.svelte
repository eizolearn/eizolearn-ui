<script lang="ts">
    import Logo from './logo.svg'
    import SettingsIcon from './settings-icon.svg'
    import CloseIcon from './close-icon.svg'
    import type { State as SettingsState } from '../Settings/state'

    export let settingsState: SettingsState

    const openSettings = () => {
        settingsState.open()
    }

    const closeSettings = () => {
        settingsState.close()
    }
</script>

<div
    class="absolute top-0 flex z-20 w-screen h-header bg-primary items-center bg-gradient-to-t from-primary to-pine-green"
>
    <Logo class="mx-auto" />
</div>
<span class="z-20 h-header flex items-center cursor-pointer absolute top-0 right-2">
    {#if $settingsState === 'close'}
        <span on:click="{openSettings}"> <SettingsIcon /> </span>
    {:else}
        <span on:click="{closeSettings}"> <CloseIcon /> </span>
    {/if}
</span>
