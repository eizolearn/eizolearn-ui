<script lang="ts" context="module">
    const TEXT = {
        'Game input': 'Game input',
    }
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { shallowEquals } from '../utils/equality'
    import ExpandMoreIcon from './expand-more-icon.svg'
    import { constructSettings, Settings, SettingsValue } from './settings'
    import { constructState, State as SettingsState } from './state'
    import SettingsOption from './SettingsOption.svelte'

    const dispatch = createEventDispatcher<{ restart: void }>()
    export let state: SettingsState = constructState()
    export let settings: Settings = constructSettings()

    let settingsToApply: SettingsValue = { ...$settings }
    let isModeExpanded = false

    $: settingsAreChanged = !shallowEquals($settings, settingsToApply)

    const restart = () => {
        dispatch('restart')
        settings.set(settingsToApply)
        state.close()
    }

    state.subscribe(value => {
        if (value === 'open') {
            settingsToApply = { ...$settings }
            isModeExpanded = false
        }
    })
</script>

<style>
    .expanded {
        max-height: fit-content;
        transition: max-height 0.5s ease-in;
    }
    .restartButton:disabled {
        opacity: 0.2;
    }
</style>

{#if $state === 'open'}
    <div class="font-nunito bg-primary absolute z-20 top-header h-page w-screen">
        <div class="w-5/6 m-auto flex flex-col gap-5 items-center text-secondary text-settings">
            <SettingsOption class="w-full max-w-xl flex flex-col items-baseline">
                <div
                    class="w-full flex justify-around items-stretch"
                    on:click="{() => {
                        isModeExpanded = !isModeExpanded
                    }}"
                >
                    <span>{TEXT['Game input']}</span>
                    <div>
                        <span class="opacity-50">{settingsToApply.input}</span>
                        <div class="max-h-0 overflow-hidden" class:expanded="{isModeExpanded}">
                            <label>
                                <input
                                    type="radio"
                                    bind:group="{settingsToApply.input}"
                                    name="game_mode"
                                    value="Text"
                                />
                                Text
                            </label><br />

                            <label>
                                <input
                                    type="radio"
                                    bind:group="{settingsToApply.input}"
                                    name="game_mode"
                                    value="Options"
                                />
                                Options
                            </label><br />
                        </div>
                    </div>
                    <ExpandMoreIcon class="{isModeExpanded ? 'rotate-180' : ''}" />
                </div>
            </SettingsOption>
        </div>

        <div
            class="absolute flex items-center justify-center bottom-0 w-screen h-header bg-gradient-to-t from-pine-green to-primary"
        >
            <input
                class="restartButton bg-secondary text-button text-primary w-64 h-14 rounded-full"
                type="button"
                value="apply & restart"
                on:click="{restart}"
                disabled="{!settingsAreChanged}"
            />
        </div>
    </div>
{/if}
