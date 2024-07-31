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
  let customPercentage = "";

  $: tipPercentage =
    selectedOption == -1
      ? Number(customPercentage) / 100
      : tipOptions[selectedOption];

  let noOfPeople = "1";
  $: numericNoOfPeople = noOfPeople === "" ? 1 : Number(noOfPeople);

  let bill = "";
  $: numericBill = bill ? Number(bill) : 0;

  $: tipPerPerson = calculateTipPerPerson(
    numericBill,
    tipPercentage,
    numericNoOfPeople
  );
  $: totalPerPerson = calculateTotalPerPerson(
    numericBill,
    tipPercentage,
    numericNoOfPeople
  );

  function reset() {
    bill = "";
    selectedOption = 0;
    customPercentage = "";
    noOfPeople = "";
  }

  // $: console.log(`Numeric bill: ${numericBill}`);
</script>

<main class="bg-light-cyan">
  <div class="flex justify-center items-center h-[150px] bg-light-cyan">
    <img src={splitterLogo} class="h-[60px]" alt="Splitter logo" />
  </div>

  <div class="bg-white rounded-t-3xl p-8">
    <Input bind:value={bill} labelText="Bill" iconPath={iconDollar} />

    <div class="flex flex-col gap-4 my-8">
      <label for="tip-percentage">Select Tip %</label>
      <div class="grid grid-cols-2 gap-4 text-2xl">
        {#each tipOptions as tipOption, i (tipOption)}
          <PercentageOption
            text={tipOption * 100 + "%"}
            selected={i == selectedOption}
            on:click={() => {
              selectedOption = i;
              customPercentage = "";
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
    />

    <!-- <Results
      bill={numericBill}
      {tipPercentage}
      noOfPeople={numericNoOfPeople}
    /> -->
    <div class="bg-very-dark-cyan p-4 mt-8 rounded-xl">
      <ResultRow title={"Tip Amount"} cost={formatCost(tipPerPerson)} />
      <ResultRow title={"Total"} cost={formatCost(totalPerPerson)} />
      <button
        on:click={reset}
        class="w-full bg-strong-cyan text-very-dark-cyan rounded-md py-2 text-2xl"
        >RESET</button
      >
    </div>
  </div>
</main>
