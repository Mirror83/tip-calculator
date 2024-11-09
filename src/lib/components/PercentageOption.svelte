<script lang="ts">
  import { cn } from "../utils/cn";

  export let selected: boolean = false;
  export let text: string;
</script>

<button
  on:click
  class={cn(
    "py-2 rounded-md hover:bg-light-cyan hover:text-very-dark-cyan",
    selected
      ? "bg-strong-cyan text-very-dark-cyan "
      : "bg-very-dark-cyan text-white"
  )}
>
  {text}
</button>
