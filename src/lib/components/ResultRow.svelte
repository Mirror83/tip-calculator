<script lang="ts">
  interface Props {
    title: any;
    cost: any;
    testId?: string;
  }

  let { title, cost, testId }: Props = $props();
</script>

<div class="flex flex-wrap gap-4 justify-between items-end mb-8">
  <div class="flex flex-col">
    <span class="text-white">{title}</span>
    <span class="text-grayish-cyan text-sm">/ person</span>
  </div>
  <span class="text-3xl lg:text-4xl text-strong-cyan" data-testid={testId}>{cost}</span>
</div>
