<script lang="ts">
    import Enter from "./enter.svg";
    import CheckMark from "./checkmark.svg";
    import Cross from "./cross.svg";
    import {learningState} from "../Learn/state";


    export let currentTranscription: string

	let inputField;
    let transcriptionInput = ''

    const checkTranscription = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            if (transcriptionInput === currentTranscription) {
                learningState.succeed();
            } else {
                learningState.fail()
            }
        }
    }

    $: failure = $learningState === 'failure';
    learningState.subscribe(value => {
        if (value === 'input') {
            inputField?.value = ''
        }
    })
</script>

<style>
    .failure {
        @apply line-through;
    }
</style>

<div class="flex items-center rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <input 
	    bind:this={inputField}
        bind:value="{transcriptionInput}"
        on:keyup={checkTranscription}
        size='4'
        maxlength='5'
        class="round flex-grow text-center focus:outline-none" class:failure>

    {#if $learningState === 'input'}
        <Enter class="mr-1"/>
    {:else if $learningState === 'success'}
        <CheckMark class="mr-1"/>
    {:else if $learningState === 'failure'}
        <Cross class="mr-1"/>
    {/if}
</div>
