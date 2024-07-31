<script lang="ts">
  import splitterLogo from "./assets/logo.svg";
  import iconDollar from "./assets/icon-dollar.svg";
  import iconPerson from "./assets/icon-person.svg";

  import Input from "./lib/components/Input.svelte";
  import PercentageOption from "./lib/components/PercentageOption.svelte";
  import Results from "./lib/components/Results.svelte";

  const tipOptions = [0.05, 0.1, 0.15, 0.25, 0.5];

  let selectedOption = 0;
  let bill = 0;
  let noOfPeople = 1;
  let customPercentage = "";
</script>

<main class="bg-light-cyan">
  <div class="flex justify-center items-center h-[150px] bg-light-cyan">
    <img src={splitterLogo} class="h-[60px]" alt="Splitter logo" />
  </div>

  <div class="bg-white rounded-t-3xl p-8">
    <Input labelText="Bill" iconPath={iconDollar} />

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

    <Input labelText="Number of people" iconPath={iconPerson} />

    <Results {bill} {selectedOption} {noOfPeople} />
  </div>
</main>
