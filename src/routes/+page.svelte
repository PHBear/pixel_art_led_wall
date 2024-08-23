<script lang="ts">
  import ColorPicker from "svelte-awesome-color-picker";
  import { browser } from "$app/environment";

  type RGB = {
    r: number;
    g: number;
    b: number;
    a: number;
  };

  let rgb: RGB = {
    r: 0,
    g: 0,
    b: 255,
    a: 100,
  };

  // grid is a 2 dimensional array of size 40 x 25 of RGB values
  let grid: RGB[][] = Array(40)
    .fill(null)
    .map(() =>
      Array(25)
        .fill(null)
        .map(() => ({ r: 255, g: 255, b: 255, a: 100 }))
    );

  function paintCell(i: number, j: number) {
    console.log(i, j);
    console.log(rgb);
    grid[i][j] = { ...rgb };
    grid = grid;
  }

  let isMouseDown = false;

  function handleMouseDown(event: MouseEvent) {
    isMouseDown = true;
  }

  function handleMouseUp() {
    isMouseDown = false;
  }

  function handleMouseOver(i: number, j: number) {
    if (isMouseDown) {
      paintCell(i, j);
    }
  }


  let saveFormValidationMessage = '';

  function getSaveModal() {
    let dialog: HTMLDialogElement | null = null;
    if (browser) {
      dialog = document.getElementById("dialog")! as HTMLDialogElement;

      // close on backdrop
      dialog.addEventListener("click", (event) => {
        const rect = (event!.target! as any).getBoundingClientRect();
        const isClickOnBackDrop =
          rect.left > event.clientX ||
          rect.right < event.clientX ||
          rect.top > event.clientY ||
          rect.bottom < event.clientY;
        if (isClickOnBackDrop) {
          dialog!.close();
		  saveFormValidationMessage = '';
        }
      });
      return dialog;
    }
    return null;
  }

  let dialog: HTMLDialogElement | null = getSaveModal();

  function openSaveImageModal() {
    dialog?.showModal();
    console.log(grid);
  }

  
  function onSubmitForm(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
	const data: any = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }
    const { name } = data;
	if (name.length < 3) {
		saveFormValidationMessage = 'Enter at least three characters'
	} else {
		if (browser) {
			(document.getElementById("nameControl")! as HTMLInputElement).value = '';
		}
		saveFormValidationMessage = '';
		dialog?.close();
	}
  }
</script>

<div class="controls">
  <ColorPicker bind:rgb position="responsive" />
  <button class="save-button btn-primary" on:click={openSaveImageModal}
    >Save</button
  >
</div>

<div>
  <div
    class="grid"
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mouseleave={handleMouseUp}
    on:touchstart={handleMouseDown}
    on:touchend={handleMouseUp}
    on:touchcancel={handleMouseUp}
    role="button"
    tabindex="0"
  >
    {#each grid as row, i}
      <div class="row">
        {#each row as cell, j}
          <div
            class="cell"
            style="background-color: rgba({cell.r}, {cell.g}, {cell.b}, {cell.a})"
            on:mousedown={() => paintCell(i, j)}
            on:mouseover={() => handleMouseOver(i, j)}
            on:focus={() => paintCell(i, j)}
            on:touchstart={() => paintCell(i, j)}
            on:touchmove={() => handleMouseOver(i, j)}
            role="button"
            tabindex="0"
          />
        {/each}
      </div>
    {/each}
  </div>
</div>

<dialog id="dialog">
  <form on:submit|preventDefault={onSubmitForm} class="saveImageForm">
    <label for="name">Name your creation</label>
    <input type="text" id="nameControl" name="name" />
	{#if saveFormValidationMessage}
		<p style="color: red">{saveFormValidationMessage}</p>
	{/if}
    <button type="submit" class="btn-primary">Save</button>
  </form>
</dialog>

<style>
  label {
    display: block;
  }
  button {
    border-radius: 5px;
  }
  .btn-primary {
    background: greenyellow;
    height: 36px;
    font-size: 16px;
    padding: 6px 20px;
  }
  .saveImageForm input {
    font-size: 20px;
    margin-top: 4px;
  }
  .saveImageForm button {
    display: block;
    margin: 0 auto;
    margin-top: 16px;
  }
  .grid {
    display: inline-block;
    border: 1px solid #ccc;
  }
  .row {
    display: flex;
  }
  .cell {
    width: 20px;
    height: 20px;
    border: 1px solid #eee;
  }
  .controls {
    display: flex;
    height: 40px;
  }
  .save-button {
    margin-left: 330px;
  }
</style>
