<script lang="ts">
    import { constructState, State as SettingsState } from './state'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher<{ restart: void }>()
    export let state: SettingsState = constructState()

    const restart = () => {
        dispatch('restart')
        state.close()
    }
</script>

{#if $state === 'open'}
    <div class="font-nunito bg-primary absolute z-10 top-header h-page left-0 w-screen h-screen bg-white">
        <div></div>
        <div
            class="absolute flex items-center justify-center bottom-0 w-screen h-header bg-gradient-to-t from-pine-green to-primary"
        >
            <div
                on:click="{restart}"
                class="bg-secondary flex items-center justify-center text-button text-primary w-64 h-14 rounded-full"
            >
                apply & restart
            </div>
        </div>
    </div>
{/if}
