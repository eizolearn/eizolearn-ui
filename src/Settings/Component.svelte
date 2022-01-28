<script lang="ts" context="module">
    const TEXT = {
        'Game input': 'Game input',
        Text: 'Text',
        Options: 'Options',
        'Input Language': 'Input Language',
        Languages: {
            English: { label: 'English', key: 'english' },
            Russian: { label: 'Русский', key: 'russian' },
        },
    }
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { shallowEquals } from '../utils/equality'
    import { constructSettings, Settings, SettingsValue } from './settings'
    import { constructState, State as SettingsState } from './state'
    import SettingsOption from './SettingsOption.svelte'
    import RadioSetting from './RadioSetting.svelte'

    const dispatch = createEventDispatcher<{ restart: void }>()
    export let state: SettingsState = constructState()
    export let settings: Settings = constructSettings()

    let settingsToApply: SettingsValue = { ...$settings }

    $: settingsAreChanged = !shallowEquals($settings, settingsToApply)

    const restart = () => {
        dispatch('restart')
        settings.set(settingsToApply)
        state.close()
    }

    state.subscribe(value => {
        if (value === 'open') {
            settingsToApply = { ...$settings }
        }
    })
</script>

<style>
    .restartButton:disabled {
        opacity: 0.2;
    }
</style>

{#if $state === 'open'}
    <div class="font-nunito bg-primary absolute z-20 top-header h-page w-screen">
        <div class="w-5/6 m-auto flex flex-col gap-5 items-center text-secondary text-settings">
            <SettingsOption class="w-full max-w-xl flex flex-col items-baseline">
                <RadioSetting
                    currentSettingValue="{settingsToApply.input}"
                    label="{TEXT['Game input']}"
                    optionName="gameMode"
                    options="{[
                        { value: 'Text', text: TEXT['Text'] },
                        { value: 'Options', text: TEXT['Options'] },
                    ]}"
                    on:settingChange="{event => {
                        settingsToApply.input = event.detail
                    }}"
                />
            </SettingsOption>

            <SettingsOption class="w-full max-w-xl flex flex-col items-baseline">
                <RadioSetting
                    currentSettingValue="{settingsToApply.inputLanguage}"
                    label="{TEXT['Input Language']}"
                    optionName="inputLang"
                    options="{[
                        { value: 'english', text: TEXT.Languages.English.label },
                        { value: 'russian', text: TEXT.Languages.Russian.label },
                    ]}"
                    on:settingChange="{event => {
                        console.log(event.detail)
                        settingsToApply.inputLanguage = event.detail
                    }}"
                />
            </SettingsOption>

            <!--            <SettingsOption class="w-full max-w-xl flex flex-col items-baseline">-->
            <!--                <div-->
            <!--                        class="w-full flex justify-around items-stretch"-->
            <!--                        on:click="{() => (isModeExpanded = !isModeExpanded)}"-->
            <!--                >-->
            <!--                    <span>{TEXT['Game input']}</span>-->

            <!--                    <div>-->
            <!--                        <span class="opacity-50">{settingsToApply.input}</span>-->

            <!--                        <div-->
            <!--                                class="max-h-0 overflow-hidden height-transition"-->
            <!--                                class:expanded="{isModeExpanded}"-->
            <!--                                on:click="{e => {-->
            <!--                                e.stopPropagation()-->
            <!--                            }}"-->
            <!--                        >-->
            <!--                            <RadioButton name="gameMode" bind:group="{settingsToApply.input}" value="Text">-->
            <!--                                {TEXT['Text']}-->
            <!--                            </RadioButton>-->
            <!--                            <RadioButton name="gameMode" bind:group="{settingsToApply.input}" value="Options">-->
            <!--                                {TEXT['Options']}-->
            <!--                            </RadioButton>-->
            <!--                        </div>-->
            <!--                    </div>-->

            <!--                    <ExpandMoreIcon class="duration-200 {isModeExpanded ? 'rotate-180' : ''}" />-->
            <!--                </div>-->
            <!--            </SettingsOption>-->

            <!--            <SettingsOption class="w-full max-w-xl flex flex-col items-baseline">-->
            <!--                <div class="w-full flex justify-around items-stretch">-->
            <!--                    <span>{TEXT['Input Language']}</span>-->
            <!--                    <select class="bg-opacity-0 bg-primary appearance-none border-none"-->
            <!--                            bind:value={currentLang}-->
            <!--                            on:change="{() => {console.log('lang changed')}}">-->
            <!--                        {#each languages as langOption}-->
            <!--                            <option value={langOption}>-->
            <!--                                {langOption.text}-->
            <!--                            </option>-->
            <!--                        {/each}-->
            <!--                    </select>-->
            <!--                </div>-->
            <!--            </SettingsOption>-->
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
