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
  import { cn } from "./lib/utils/cn";

  const tipOptions = [0.05, 0.1, 0.15, 0.25, 0.5];

  let selectedOption = 0;
  let customPercentage = 0;
  let customPercentageError = "";

  $: tipPercentage = getTipPercentage(selectedOption, customPercentage);

  let noOfPeople = 1;
  let peopleError = "";

  let bill = 0;
  let billError = "";

  $: tipPerPerson = calculateTipPerPerson(bill, tipPercentage, noOfPeople);
  $: totalPerPerson = calculateTotalPerPerson(bill, tipPercentage, noOfPeople);

  function reset() {
    bill = 0;
    selectedOption = 0;
    customPercentage = 0;
    noOfPeople = 1;
  }

  function getTipPercentage(option: number, percentage: number | null): number {
    if (option != -1) return tipOptions[selectedOption] || 0;

    return Number(percentage) > 100
      ? 1
      : Number(percentage) < 0
        ? 0
        : Number(percentage) / 100;
  }

  type InputEvent = Event & {
    currentTarget: EventTarget &
      HTMLInputElement & {
        validity: ValidityState;
      };
  };

  function handleBillInput(event: InputEvent) {
    const input = event.currentTarget;
    const value = input.value;
    const numericValue = Number(value);

    if (isNaN(Number(value))) {
      billError = "Invalid number";
    } else if (numericValue < 0) {
      billError = "Can't be negative";
    } else if (numericValue > 1_000_000) {
      billError = "Can't be more than 1,000,000";
    } else {
      billError = "";
      bill = numericValue;
    }

    if (billError != "") {
      input.setCustomValidity(billError);
    } else {
      input.setCustomValidity("");
    }
  }

  function handleCustomPercentageInput(event: InputEvent) {
    const input = event.currentTarget;
    const value = input.value;
    const validity = input.validity;

    if (input.checkValidity()) {
      customPercentageError = "";
      customPercentage = Number(value);
    } else {
      console.log(input.validationMessage);
      if (validity.rangeOverflow) {
        customPercentageError = "Maximium is 100%";
      } else if (validity.rangeUnderflow) {
        customPercentageError = "Cannot be less than 0";
      } else if (validity.stepMismatch) {
        customPercentageError = "Only whole numbers allowed";
      } else if (validity.badInput) {
        customPercentageError = "Must be a number";
      }
    }
  }

  function handlePeopleInput(event: InputEvent) {
    const input = event.currentTarget;
    const value = input.value;
    const validity = input.validity;
    console.log(validity);

    if (input.checkValidity()) {
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
        peopleError = "People cannot be fractional";
      } else {
        peopleError = input.validationMessage;
      }
    }
  }
</script>

<main
  class="bg-light-cyan lg:flex lg:flex-col lg:items-center lg:justify-center lg:min-h-screen lg:py-8 lg:gap-8"
>
  <div
    class="flex justify-center items-center h-[150px] lg:h-auto bg-light-cyan"
  >
    <img src={splitterLogo} class="mb-8" alt="Splitter logo" />
  </div>

  <div
    class="bg-white rounded-t-3xl lg:rounded-3xl p-8 lg:w-8/12 md:grid md:grid-cols-2 md:gap-8"
  >
    <div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4 justify-between align-baseline">
          <label for="bill" class="text-dark-cyan">Bill</label>
          <span class="text-red-400">{billError}</span>
        </div>
        <div class={cn("input-container", billError != "" && "border-red-400")}>
          <img src={iconDollar} alt="" role="presentation" />
          <input
            on:input={handleBillInput}
            value={bill}
            id="bill"
            type="text"
            inputmode="numeric"
            placeholder="100.00"
            class="text-end"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4 my-8">
        <span class="text-dark-cyan">Select Tip %</span>
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
          <div>
            <div class="flex flex-row-reverse justify-center mb-2">
              <label
                for="custom-tip-percentage"
                class="text-red-400 text-xs text-center"
                >{customPercentageError}</label
              >
            </div>
            <div class="input-container">
              <input
                on:focus={() => (selectedOption = -1)}
                on:input={handleCustomPercentageInput}
                bind:value={customPercentage}
                type="number"
                min={0}
                max={100}
                inputmode="numeric"
                placeholder="Custom"
                name="custom-tip"
                id="custom-tip-percentage"
                class="text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-4 justify-between align-baseline">
          <label for="number-of-people" class="text-dark-cyan"
            >Number of people</label
          >
          <span class="text-red-400">{peopleError}</span>
        </div>
        <div class="input-container">
          <img src={iconPerson} alt="" role="presentation" />
          <input
            on:input={handlePeopleInput}
            id="number-of-people"
            name="People"
            type="number"
            min={1}
            max={20}
            placeholder="1"
            value={noOfPeople}
            class="text-end"
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
