<script lang="ts">
  import splitterLogo from "./assets/logo.svg";
  import iconDollar from "./assets/icon-dollar.svg";
  import iconPerson from "./assets/icon-person.svg";

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

  $: tipPercentage = getTipPercentage(customPercentage);

  let noOfPeople = 1;
  let peopleError = "";

  let bill = 0;
  let billError = "";
  $: console.log(bill);

  $: tipPerPerson = calculateTipPerPerson(bill, tipPercentage, noOfPeople);
  $: totalPerPerson = calculateTotalPerPerson(bill, tipPercentage, noOfPeople);

  function reset() {
    bill = 0;
    selectedOption = 0;
    customPercentage = 0;
    noOfPeople = 1;
  }

  function getTipPercentage(percentage: number | null): number {
    if (selectedOption != -1) return tipOptions[selectedOption] || 0;

    return Number(percentage) > 100
      ? 1
      : Number(percentage) < 0
        ? 0
        : Number(percentage) / 100;
  }

  function handleBillInput(
    event: Event & {
      currentTarget: EventTarget &
        HTMLInputElement & {
          validity: ValidityState;
        };
    }
  ) {
    const value = event.currentTarget.value;
    const validity = event.currentTarget.validity;

    if (event.currentTarget.checkValidity()) {
      billError = "";
      bill = Number(value);
    } else {
      if (validity.patternMismatch) {
        if (!isNaN(Number(value))) {
          if (Number(value) < 0) {
            billError = "Amount cannot be negative";
          } else if (value[0] != "." && value.split(".")[1].length > 2) {
            billError = "Too many decimal places";
          }
        } else {
          billError = "Input should be numeric";
        }
      } else {
        billError = event.currentTarget.validationMessage;
      }
      bill = 0;
    }
  }

  function handlePeopleInput(
    event: Event & {
      currentTarget: EventTarget &
        HTMLInputElement & {
          validity: ValidityState;
        };
    }
  ) {
    const value = event.currentTarget.value;
    const validity = event.currentTarget.validity;
    console.log(validity);

    if (event.currentTarget.checkValidity()) {
      peopleError = "";
      noOfPeople = Number(value) == 0 ? 1 : Number(value);
    } else {
      if (validity.rangeUnderflow) {
        if (Number(value) === 0) {
          peopleError = "Can't be zero";
        } else peopleError = "Should be at least 1";
      } else if (validity.rangeOverflow) {
        peopleError = "Should be at most 20.";
      } else if (validity.stepMismatch) {
        console.log(event.currentTarget.validationMessage);
        peopleError = "People cannot be fractional";
      } else {
        peopleError = event.currentTarget.validationMessage;
      }
      noOfPeople = 1;
    }
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
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4 justify-between align-baseline">
          <label for="Bill">Bill</label>
          <span class="text-red-400">{billError}</span>
        </div>
        <div class="input-container">
          <img src={iconDollar} alt="" role="presentation" class="h-6 w-6" />
          <input
            on:input={handleBillInput}
            id="Bill"
            type="text"
            inputmode="numeric"
            pattern={`^[0-9]+[.]?[0-9]{0,2}$`}
            placeholder="100.00"
            maxlength="10"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4 my-8">
        <label for="tip-percentage">Select Tip %</label>
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 text-2xl">
          {#each tipOptions as tipOption, i (tipOption)}
            <PercentageOption
              text={tipOption * 100 + "%"}
              selected={i == selectedOption}
              on:click={() => {
                selectedOption = i;
              }}
            />
          {/each}
          <input
            on:focus={() => (selectedOption = -1)}
            bind:value={customPercentage}
            type="number"
            step="1"
            min="0"
            max="100"
            maxlength="3"
            placeholder="Custom"
            name="custom-tip"
            id="custom-tip"
            class="text-2xl text-center rounded-md bg-very-light-cyan outline-none
          focus:outline-strong-cyan px-2 focus:invalid:outline-red-400 invalid:outline-red-400"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4 justify-between align-baseline">
          <label for="Peopke">People</label>
          <span class="text-red-400">{peopleError}</span>
        </div>
        <div class="input-container">
          <img src={iconPerson} alt="" role="presentation" class="h-6 w-6" />
          <input
            on:input={handlePeopleInput}
            id="People"
            type="number"
            min="1"
            max="20"
            maxlength="2"
            step="1"
            placeholder="1"
          />
        </div>
      </div>
    </div>

    <div
      class="bg-very-dark-cyan p-4 py-8 rounded-xl
       md:p-8 mt-8 md:mt-0 md:flex md:flex-col md:justify-between"
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

<style>
  .input-container {
    @apply flex justify-between items-center gap-2 py-2 px-4 rounded-lg 
    focus-within:border-2 focus-within:border-strong-cyan bg-very-light-cyan
    has-[:invalid]:border-2 has-[:invalid]:border-red-400;
  }

  .input-container > input {
    @apply w-full relative appearance-none outline-none bg-very-light-cyan
    rounded-md text-2xl text-end p-2;
  }
</style>
