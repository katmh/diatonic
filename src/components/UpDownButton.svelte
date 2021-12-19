<script lang="ts">
    export let directionIsUp = true;
    export let handleClick: (e, down?: boolean) => void;
    export let rulerId: string;
</script>

<div
    class="button_container"
    id={directionIsUp ? "top_button_container" : "bottom_button_container"}
    on:click={(e) => handleClick(e, !directionIsUp)}
    data-ruler-id={rulerId}
>
    <button
        on:click={(e) => handleClick(e, !directionIsUp)}
        data-ruler-id={rulerId}
        aria-label={directionIsUp ? "up" : "down"}
    >
        <div
            class="triangle"
            id={directionIsUp ? "top_triangle" : "bottom_triangle"}
        />
    </button>
</div>

<style>
    .button_container {
        position: absolute;
        width: calc(100% + 4px);
        margin-left: -2px; /* so box shadow of ruler doesn't peek through */
        z-index: 1;
        padding: 1rem 0 2.15rem;
        border: none;
        background: linear-gradient(
            rgba(255, 255, 255, 1) 60%,
            rgba(255, 255, 255, 0)
        );
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    #bottom_button_container {
        bottom: 0;
        padding: 2.15rem 0 1rem;
        background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1) 60%,
            rgba(255, 255, 255, 0)
        );
    }

    .triangle {
        width: 0;
        height: 0;
        border-left: 9px solid transparent;
        border-right: 9px solid transparent;
        margin: 0 auto;
    }

    #top_triangle {
        border-bottom: 10px solid #6b5fd1;
    }

    #bottom_triangle {
        border-top: 10px solid #6b5fd1;
        margin: 1px auto 0;
    }

    button {
        width: 36px;
        height: 34px;
        background: #d5d1fe;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: 0.1s;
    }

    button:hover {
        box-shadow: 0 2px 8px rgba(63, 56, 125, 20%);
    }

    .button_container:hover button {
        box-shadow: 0 2px 8px rgba(63, 56, 125, 20%);
    }

    button:active {
        background: #c6c1fa;
    }

    .button_container:active button {
        background: #c6c1fa;
    }
</style>
