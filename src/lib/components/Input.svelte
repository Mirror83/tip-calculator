<script lang="ts">
  export let value: string;
  export let labelText: string;
  export let iconPath: string;
</script>

<div class="flex flex-col gap-4">
  <label for={labelText}>{labelText}</label>
  <!-- <div class="flex justify-between items-center gap-2 p-2 bg-very-light-cyan"> -->
  <!-- <img src={iconPath} alt="" role="presentation" class="h-6 w-6" /> -->
  <input
    bind:value
    id={labelText}
    type="text"
    placeholder="100.00"
    class="w-full relative appearance-none outline-none bg-very-light-cyan
       focus:outline-strong-cyan rounded-md text-2xl text-end p-2"
  />
  <!-- </div> -->
</div>
