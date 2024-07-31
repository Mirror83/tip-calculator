<script lang="ts">
  import { cn } from "../utils/cn";

  export let selected = false;
  export let value;
  export let text;
</script>

<button
  class={cn(
    "py-4 rounded-md",
    selected
      ? "bg-strong-cyan text-very-dark-cyan"
      : "bg-very-dark-cyan text-white"
  )}
>
  {text}
</button>
