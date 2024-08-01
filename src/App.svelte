<script lang="ts">
  import splitterLogo from "./assets/logo.svg";
  import iconDollar from "./assets/icon-dollar.svg";
  import iconPerson from "./assets/icon-person.svg";

  import Input from "./lib/components/Input.svelte";
  import PercentageOption from "./lib/components/PercentageOption.svelte";

  import {
    calculateTipPerPerson,
    calculateTotalPerPerson,
    formatCost,
  } from "./lib/utils/calculate-tip";
  import ResultRow from "./lib/components/ResultRow.svelte";

  const tipOptions = [0.05, 0.1, 0.15, 0.25, 0.5];

  let selectedOption = 0;
  let customPercentage = 0;

  $: tipPercentage =
    selectedOption == -1
      ? Number(customPercentage) / 100
      : tipOptions[selectedOption];

  let noOfPeople = 1;

  let bill = 0;
  $: console.log(bill);

  $: tipPerPerson = calculateTipPerPerson(bill, tipPercentage, noOfPeople);
  $: totalPerPerson = calculateTotalPerPerson(bill, tipPercentage, noOfPeople);

  function reset() {
    bill = 0;
    selectedOption = 0;
    customPercentage = 0;
    noOfPeople = 0;
  }
</script>

<main
  class="bg-light-cyan lg:flex lg:flex-col lg:items-center lg:justify-center lg:min-h-screen lg:py-8"
>
  <div class="flex justify-center items-center h-[150px] bg-light-cyan">
    <img src={splitterLogo} class="h-[60px]" alt="Splitter logo" />
  </div>

  <div
    class="bg-white rounded-t-3xl lg:rounded-3xl p-8 lg:w-10/12 md:grid md:grid-cols-2 md:gap-8"
  >
    <div>
      <Input
        bind:value={bill}
        labelText="Bill"
        iconPath={iconDollar}
        placeholder={100.5}
        min={0}
        max={10_000}
      />

      <div class="flex flex-col gap-4 my-8">
        <label for="tip-percentage">Select Tip %</label>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 text-2xl">
          {#each tipOptions as tipOption, i (tipOption)}
            <PercentageOption
              text={tipOption * 100 + "%"}
              selected={i == selectedOption}
              on:click={() => {
                selectedOption = i;
                customPercentage = 0;
              }}
            />
          {/each}
          <input
            on:focus={() => (selectedOption = -1)}
            bind:value={customPercentage}
            type="number"
            step="5"
            min="0"
            max="100"
            placeholder="Custom"
            name="custom-tip"
            id="custom-tip"
            class="text-2xl text-center rounded-md bg-very-light-cyan
          outline-none focus:outline-strong-cyan px-2"
          />
        </div>
      </div>

      <Input
        bind:value={noOfPeople}
        labelText="Number of people"
        iconPath={iconPerson}
        placeholder={1}
        min={1}
        max={20}
      />
    </div>

    <!-- <Results
      bill={numericBill}
      {tipPercentage}
      noOfPeople={numericNoOfPeople}
    /> -->
    <div
      class="bg-very-dark-cyan p-4 py-8 md:p-8 mt-8 md:mt-0 rounded-xl md:flex md:flex-col md:justify-between"
    >
      <div>
        <ResultRow title={"Tip Amount"} cost={formatCost(tipPerPerson)} />
        <ResultRow title={"Total"} cost={formatCost(totalPerPerson)} />
      </div>

      <button
        on:click={reset}
        class="w-full bg-strong-cyan hover:bg-light-cyan text-very-dark-cyan rounded-md py-2 text-2xl"
        >RESET</button
      >
    </div>
  </div>
</main>
