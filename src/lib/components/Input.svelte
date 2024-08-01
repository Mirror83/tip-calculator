<script lang="ts">
  export let value: number;
  export let labelText: string;
  export let placeholder: number;
  export let iconPath: string;
  export let min: number = 1;
  export let max: number;
</script>

<div class="flex flex-col gap-4">
  <label for={labelText}>{labelText}</label>
  <div
    class="flex justify-between items-center gap-2 p-2 px-4 rounded-lg focus-within:border-2 focus-within:border-strong-cyan bg-very-light-cyan"
  >
    <img src={iconPath} alt="" role="presentation" class="h-6 w-6" />
    <input
      bind:value
      id={labelText}
      type="number"
      {min}
      {max}
      placeholder={placeholder.toString()}
      class="w-full relative appearance-none outline-none bg-very-light-cyan
        rounded-md text-2xl text-end p-2"
    />
  </div>
</div>
