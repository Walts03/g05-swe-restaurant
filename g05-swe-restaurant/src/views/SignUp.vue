<template>
  <section class="bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <h1
        class="text-xl mb-6 text-white font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        Create an account
      </h1>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleSignup">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Name</label
              >
              <input
                type="name"
                name="name"
                id="name"
								v-model="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                id="email"
								v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
								placeholder="••••••••"
								v-model="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-[#FFC933] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <RouterLink
                to="/auth/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
							>
								Login here
							</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: "SignUpPage",
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		async handleSignup() {
			try {
				const response = await fetch('http://localhost:8000/users/register', {	// Update this URL to match your actual backend URL
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: this.name,
						email: this.email,
						password: this.password,
						type: "regular_user",
					}),
					credentials: 'include' // Include this to handle cookies
				});
				
				const result = await response.json();
				if (response.ok) {
					this.$notify({
						type: "success",
						title: "Success",
						text: 'Signup successful!',
					})
					this.$router.push({ name: 'Login' });
				} else {
					this.$notify({
						type: "error",
						title: "Error",
						text: `Error: ${result.detail || 'Signup failed'}`,
					})
				}
			} catch (error) {
				this.$notify({
					type: "error",
					title: "Error",
					text: `Error: ${error.message}'}`,
				})
			}
		}
	}
};
</script>

