<script>
	import { onMount } from 'svelte';

	const apiURL = 'http://localhost:3000';
	const mouse = { x: 0, y: 0 };
	const condomPos = { x: 0, y: 0, start: null, end: null };

	let captchaContainer;
	let captcha;
	let follow;
	let success;
	let angle = 0;
	let distance = 0;
	let loading;

	const resetAll = () => {
		angle = 0;
		distance = 0;
		condomPos.start = null;
		condomPos.end = null;
	};

	const handleMousemove = (event) => {
		const rect = event.currentTarget.getBoundingClientRect();
		mouse.x = event.clientX - rect.x - ((captcha.condom && captcha.condom.width / 2) || 0);
		mouse.y = event.clientY - rect.y;
	};

	const handleMouseDown = () => {
		resetAll();
		condomPos.start = { ...mouse };
	};

	const handleMouseUp = () => {
		condomPos.end = { ...mouse };
	};

	const handleSendClick = () => {
		resolveCaptcha({ ...condomPos });
	};

	const handleMouseResetClick = () => {
		resetAll();
		captcha = null;
		fetchCaptcha();
	};

	const fetchCaptcha = async () => {
		loading = 'captcha';
		const resp = await fetch(`${apiURL}/new`, {
			credentials: 'include'
		});
		captcha = await resp.json();
		loading = false;
	};

	const resolveCaptcha = async (pos) => {
		const ratio = captcha.size / captchaContainer.clientWidth;
		const data = {
			start: {
				x: pos.start.x * ratio,
				y: pos.start.y * ratio
			},
			end: {
				x: pos.end.x * ratio,
				y: pos.end.y * ratio
			}
		};
		loading = 'send';
		const resp = await fetch(`${apiURL}/answer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(data)
		});
		const { status, message } = await resp.json();

		if (status == 'ok') {
			success = true;
		} else {
			handleMouseResetClick();
		}
		loading = false;
	};

	onMount(() => {
		let rid = requestAnimationFrame(function update() {
			if (follow) {
				condomPos.x = mouse.x;
				condomPos.y = mouse.y;

				if (condomPos.start && !condomPos.end) {
					distance = Math.hypot(condomPos.x - condomPos.start.x, condomPos.y - condomPos.start.y);

					angle =
						(Math.atan2(mouse.y - condomPos.start.y, mouse.x - condomPos.start.x) * 180) / Math.PI +
						180 +
						90;
				}
			}
			rid = requestAnimationFrame(update);
		});
		return () => cancelAnimationFrame(rid);
	});

	fetchCaptcha();
</script>

<div class="p-3 w-max border border-gray-10 space-y-4 rounded">
	<div class="bg-blue-400 p-3">
		<h5 class=" font-bold text-white text-xl">Capoter</h5>
		<p class="text-xs text-gray-200">Press to pull condom</p>
	</div>
	<div
		class="w-72 h-72 {(success && 'bg-green-100') ||
			'bg-gray-100'} flex items-center justify-center relative overflow-hidden"
	>
		{#if success}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-24 h-24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
			</svg>
		{:else if captcha}
			<div
				bind:this={captchaContainer}
				on:mouseup={handleMouseUp}
				on:mousedown={handleMouseDown}
				on:mousemove={handleMousemove}
				on:mouseenter={() => (follow = true)}
				on:mouseleave={() => (follow = false)}
				class="w-full h-full select-none"
				style={`background-image: url(data:image/png;base64,${captcha.image}); background-size: 100%;`}
			>
				<div
					class="block text-gray-300 absolute"
					style="width: {captcha.condom.width}px; top: {(condomPos.start?.y || condomPos.y) -
						((captcha.condom && captcha.condom.height / 2) || 0)}px; left: {condomPos.start?.x ||
						condomPos.x}px; transform: rotate({angle}deg);transform-origin: center top;"
				>
					<svg class="w-full px-1" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
						<svg
							class="w-full h-full block text-gray-200 text-opacity-80"
							viewBox="0 0 30 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9.18519 9.9702C4.49192 9.9702 0.674072 13.1035 0.674072 16.9553H29.0445C29.0445 13.1035 25.2266 9.9702 20.5333 9.9702C18.966 9.9702 17.6963 8.92816 17.6963 7.64184V2.9851C17.6963 1.70138 16.4242 0.656738 14.8593 0.656738C13.2943 0.656738 12.0222 1.70138 12.0222 2.9851V7.64184C12.0222 8.92816 10.7525 9.9702 9.18519 9.9702Z"
								fill="currentColor"
							/>
						</svg>
						<path
							d="M11.3482 6.9851C11.3482 3.13332 15.166 0 19.8593 0C24.5526 0 28.3704 3.13332 28.3704 6.9851V9.5473C34.8368 10.6297 39.7186 15.3325 39.7186 20.9553H34.0445C34.0445 17.1035 30.2266 13.9702 25.5334 13.9702C23.966 13.9702 22.6963 12.9282 22.6963 11.6418V6.9851C22.6963 5.70137 21.4242 4.65673 19.8593 4.65673C18.2943 4.65673 17.0222 5.70137 17.0222 6.9851V11.6418C17.0222 12.9282 15.7525 13.9702 14.1852 13.9702C9.49192 13.9702 5.67408 17.1035 5.67408 20.9553H0C0 15.3331 4.88173 10.6296 11.3482 9.5473V6.9851Z"
							fill="currentColor"
						/>
					</svg>
					<div class="condom mx-1 h-0" style="height: {distance}px;" />
					<div class="rounded-full w-full h-2 bg-current" />
				</div>
			</div>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-8 h-8 animate-spin"
				fill="none"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
		{/if}
	</div>
	{#if !success}
		<div class="flex justify-between items-center w-full">
			<div class="hover:scale-110 px-2">
				<svg
					on:mousedown={handleMouseResetClick}
					class="w-6 h-6 hover:rotate-45 transition-all transform -rotate-45"
					viewBox="0 0 49 49"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.7117 2.88973C14.7574 3.21626 12.8511 4.0759 11.8828 4.62293C3.48116 9.33984 -1.14539 18.8366 0.318712 28.3545C1.9906 39.3 11.2965 47.5543 22.4075 47.9716C24.1088 48.031 26.1562 47.8562 27.8138 47.5023C29.1556 47.2272 29.2369 47.1971 29.583 46.884C30.5284 46.0468 30.4436 44.6378 29.4066 43.9197C28.8475 43.5363 28.4785 43.5198 26.9324 43.8064C25.3979 44.1 24.6574 44.176 23.2763 44.1749C16.6401 44.1813 10.4129 40.762 6.84505 35.1513C4.63343 31.6585 3.59684 27.4982 3.91112 23.3761C4.14555 20.4377 4.99025 17.732 6.48479 15.1404C8.55808 11.5466 11.5475 8.85875 15.467 7.05367C16.5909 6.53694 19.7181 5.70843 21.0645 5.57022C28.365 4.82625 35.2679 8.06736 39.3854 14.1822C41.9821 18.0327 43.0598 22.9915 42.3504 27.7841L42.1987 28.7983L41.4499 27.6139C40.5435 26.1927 40.3464 25.9558 39.8823 25.7558C38.7244 25.2651 37.4426 25.979 37.2513 27.23C37.144 27.9471 37.1463 27.9564 40.6862 33.574C41.3377 34.6051 41.5997 34.9442 41.9198 35.1603C42.4302 35.5066 43.094 35.5976 43.6141 35.3891C44.1156 35.1853 50.056 31.4761 50.4253 31.1375C50.7621 30.8268 51.0227 30.1306 50.9905 29.6455C50.9517 28.8957 50.2838 28.1153 49.5574 27.9708C48.831 27.8263 48.492 27.9305 47.2055 28.7442C46.5576 29.1522 45.9979 29.4791 45.9724 29.4558C45.9492 29.4419 45.9703 29.2098 46.0192 28.9313C46.5695 25.8353 46.5066 23.0894 45.8151 19.9181C44.8923 15.6604 43.1286 12.2632 40.2088 9.09487C38.2746 6.99272 35.5976 5.03621 33.0313 3.84112C28.9917 1.95781 24.1619 1.25766 19.7675 1.90876C18.8552 2.04731 16.5568 2.60025 15.7117 2.88973Z"
						fill="currentColot"
					/>
				</svg>
			</div>
			<button
				disabled={loading}
				class="rounded px-6 py-2 bg-blue-300 hover:bg-blue-400 text-white"
				on:click={handleSendClick}
			>
				{#if loading == 'send'}
					Verifing...
				{:else}
					Send
				{/if}
			</button>
		</div>
	{/if}
</div>

<style scoped>
	button:disabled {
		@apply bg-gray-300 text-white hover:bg-gray-300;
	}
	.condom {
		@apply bg-gray-200 bg-opacity-80;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='1 1 39 2' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M40.1741 0.366577H34.5V4H40.1741V0.366577Z' fill='rgb(209 213 219)' /%3E%3Cpath d='M6.12965 0.366577H0.455566V4H6.12965V0.366577Z' fill='rgb(209 213 219)' /%3E%3C/svg%3E%0A");
		background-size: 100%;
	}
</style>
