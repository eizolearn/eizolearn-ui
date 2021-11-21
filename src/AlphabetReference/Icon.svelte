<script lang="ts">
    import type { State as AlphabetReferenceState } from './state'
    import Icon from './icon.svg'

    export let state: AlphabetReferenceState
</script>

<span
    class="h-max w-max cursor-pointer"
    on:click="{() => {
        state.open()
    }}"
>
    <Icon class="h-full w-full" />
</span>
