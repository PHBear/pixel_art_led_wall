<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

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
		a: 100
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

	function handleMouseDown() {
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
</script>

<ColorPicker bind:rgb position="responsive" />

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

<style>
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
</style>
