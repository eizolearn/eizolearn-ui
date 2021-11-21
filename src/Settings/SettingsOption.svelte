<style>
    /* https://hype4.academy/tools/glassmorphism-generator */
    .settingsOption {
        background: rgba(173, 216, 230, 0.25);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
</style>

<div class="settingsOption {$$props.class}">
    <slot />
</div>
