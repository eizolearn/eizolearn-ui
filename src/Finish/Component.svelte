<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import CheckMark from './checkmark.svg'
    import Refresh from './refresh.svg'

    const dispatch = createEventDispatcher<{ refresh: void }>()
</script>

<div class="flex flex-col justify-center items-center mx-auto object-contain">
    <CheckMark viewBox="0 0 20 20" class="w-36 h-36 fill-current" />
    <h1>Learning Completed!</h1>
    <div on:click="{() => dispatch('refresh')}">
        <Refresh class="" />
    </div>
</div>
