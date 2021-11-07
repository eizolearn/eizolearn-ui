<script lang="ts">
    import type { State as SettingsState } from '../Settings/state'
    import Logo from './logo.svg'
    import SettingsIcon from '../Settings/Icon.svelte'

    export let settingsState: SettingsState
</script>

<div class="sticky top-0 z-50 h-header w-screen flex justify-between bg-gradient-to-t from-primary to-pine-green">
    <span class="w-16"></span>

    <Logo class="self-center" />

    <span class="flex items-center justify-center h-full w-16">
        <SettingsIcon state="{settingsState}" />
    </span>
</div>
