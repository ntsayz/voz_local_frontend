<script lang="ts">
	export let error: { message?: string };
	export let status: number;

	// Custom error message based on the status
	let errorMessage = error?.message || 'An unexpected error occurred.';

	if (status === 404) {
		errorMessage = "The page you're looking for does not exist.";
	}
</script>

<div class="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
	<div class="text-center">
		<h1 class="text-6xl font-extrabold text-gray-100">{status}</h1>
		<p class="mt-4 text-xl text-gray-300">{errorMessage}</p>

		<a 
			href="/" 
			class="mt-6 inline-block bg-gray-800 text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-700 hover:text-white transition"
		>
			Voltar para a página principal
		</a>
	</div>
</div>
