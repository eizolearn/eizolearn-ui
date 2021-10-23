<script lang="ts">
    import Enter from "./enter.svg";
    import {learningState} from "../learningState";

    export let currentTranscription: string
    let transcriptionInput = ''

    const handleKeyup = (event) => {
        if (event.code === 'Enter') {
            learningState.fail();
            if (transcriptionInput === currentTranscription) {
            }
        }
    }
</script>
<div>
<div class="flex items-center rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <input value="{transcriptionInput}"
           on:keyup={handleKeyup}
           size='4'
           maxlength='5'
           class="round flex-grow text-center focus:outline-none">
    <Enter class="mr-1"/>
</div>
</div>