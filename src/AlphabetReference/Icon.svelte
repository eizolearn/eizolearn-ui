<script lang="ts">
    import type { State as AlphabetReferenceState } from './state'
    import Icon from './icon.svg'

    export let state: AlphabetReferenceState
</script>

<span
    class="h-max w-max"
    on:click="{() => {
        state.open()
    }}"
>
    <Icon />
</span>
