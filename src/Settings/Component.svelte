<script lang="ts" context="module">
    const TEXT = {
        'Game input': 'Game input',
        'Text': 'Text',
        'Options': 'Options'
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

    const changeExpandMode = (event) => {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'LABEL') {
            isModeExpanded = !isModeExpanded
        }
    }
</script>

<style>
    .height-transition {
        transition: max-height 0.5s;
    }
    .expanded {
        max-height: 80px;
    }
    .restartButton:disabled {
        opacity: 0.2;
    }
    input[type="radio"] {
        transform: translateY(-0.075em);
    }
</style>

{#if $state === 'open'}
    <div class="font-nunito bg-primary absolute z-20 top-header h-page w-screen">
        <div class="w-5/6 m-auto flex flex-col gap-5 items-center text-secondary text-settings">
            <SettingsOption class="w-full max-w-xl flex flex-col items-baseline">
                <div
                    class="w-full flex justify-around items-stretch"
                    on:click="{changeExpandMode}"
                >
                    <span>{TEXT['Game input']}</span>
                    <div>
                        <span class="opacity-50">{settingsToApply.input}</span>
                        <div class="max-h-0 overflow-hidden height-transition" class:expanded="{isModeExpanded}">
                            <label class="flex items-center mb-0">
                                <input
                                    type="radio"
                                    class="rounded-full checked:bg-secondary secondary w-5 h-5 mr-2 appearance-none border-2 border-secondary border-solid bg-transparent"
                                    bind:group="{settingsToApply.input}"
                                    name="game_mode"
                                    value="Text"
                                />
                                {TEXT['Text']}
                            </label>

                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    class="rounded-full checked:bg-secondary secondary w-5 h-5 mr-2 appearance-none border-2 border-secondary border-solid bg-transparent"
                                    bind:group="{settingsToApply.input}"
                                    name="game_mode"
                                    value="Options"
                                />
                                {TEXT['Options']}
                            </label><br />
                        </div>
                    </div>
                    <ExpandMoreIcon class="{isModeExpanded ? 'duration-200 rotate-180' : 'duration-200'}" />
                </div>
            </SettingsOption>
        </div>

        <div
            class="absolute flex items-center justify-center bottom-0 w-screen h-header bg-gradient-to-t from-pine-green to-primary"
        >
            <input
                class="restartButton bg-secondary text-button text-primary w-64 h-14 rounded-full duration-200"
                type="button"
                value="apply & restart"
                on:click="{restart}"
                disabled="{!settingsAreChanged}"
            />
        </div>
    </div>
{/if}
