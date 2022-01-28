<script lang="ts">
    import RadioButton from './RadioButton.svelte'
    import ExpandMoreIcon from './expand-more-icon.svg'

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    type OptionType = {
        value: string
        text: string
    }
    export let label: string
    export let options: OptionType[]
    export let currentSettingValue: string
    export let optionName: string

    let newSettingValue = currentSettingValue

    $: dispatch('settingChange', newSettingValue)
    $: currentSettingValueLabel = options?.find(option => option.value === currentSettingValue)?.text ?? ''
    let isModeExpanded = false
</script>

<style>
    .height-transition {
        transition: max-height 0.5s;
    }

    .expanded {
        max-height: 80px;
    }
</style>

<div class="w-full flex justify-between items-stretch" on:click="{() => (isModeExpanded = !isModeExpanded)}">
    <span class="w-3/6 pl-8">{label}</span>

    <div>
        <span class="opacity-50 w-2/6">{currentSettingValueLabel}</span>

        <div
            class="max-h-0 overflow-hidden height-transition"
            class:expanded="{isModeExpanded}"
            on:click="{e => {
                e.stopPropagation()
            }}"
        >
            {#each options as option}
                <RadioButton name="{optionName}" bind:group="{newSettingValue}" value="{option.value}">
                    {option.text}
                </RadioButton>
            {/each}
        </div>
    </div>

    <ExpandMoreIcon class="duration-200 {isModeExpanded ? 'rotate-180' : ''} w-1/6" />
</div>
