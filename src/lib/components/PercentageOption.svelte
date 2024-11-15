<script lang="ts">
  import { cn } from "../utils/cn";

  interface Props {
    selected?: boolean;
    text: string;
    onClick: () => void;
  }

  let { selected = false, text, onClick }: Props = $props();
</script>

<button
  onclick={onClick}
  class={cn(
    "py-2 rounded-md hover:bg-light-cyan hover:text-very-dark-cyan",
    selected
      ? "bg-strong-cyan text-very-dark-cyan "
      : "bg-very-dark-cyan text-white"
  )}
>
  {text}
</button>
