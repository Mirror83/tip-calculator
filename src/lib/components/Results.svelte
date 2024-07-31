<script lang="ts">
  import {
    calculateTipPerPerson,
    calculateTotalPerPerson,
    formatCost,
  } from "../utils/calculate-tip";
  import ResultRow from "./ResultRow.svelte";

  export let bill: number;
  export let noOfPeople: number;
  export let tipPercentage: number;

  console.log(bill, tipPercentage, noOfPeople);

  let tipPerPerson = calculateTipPerPerson(bill, tipPercentage, noOfPeople);
  let totalPerPerson = calculateTotalPerPerson(bill, tipPercentage, noOfPeople);
</script>

<div class="bg-very-dark-cyan p-4 mt-8 rounded-xl">
  <ResultRow title={"Tip Amount"} cost={formatCost(tipPerPerson)} />
  <ResultRow title={"Total"} cost={formatCost(totalPerPerson)} />
  <button
    class="w-full bg-strong-cyan text-very-dark-cyan rounded-md py-2 text-2xl"
    >RESET</button
  >
</div>
