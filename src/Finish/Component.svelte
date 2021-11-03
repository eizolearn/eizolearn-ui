<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import CheckMark from './checkmark.svg'
    import Refresh from './refresh.svg'

    const dispatch = createEventDispatcher<{ refresh: void }>()
</script>

<div class="h-page mt-header flex flex-col justify-around items-center mx-auto object-contain">
    <div>
        <CheckMark viewBox="0 0 20 20" class="w-36 h-36 fill-current" />
        <h1>Learning Completed!</h1>
    </div>
    <div
        on:click="{() => {
            dispatch('refresh')
        }}"
        class="mb-40"
    >
        <Refresh class="" />
    </div>
</div>
