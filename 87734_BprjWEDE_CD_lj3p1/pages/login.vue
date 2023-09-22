<template>
  <div class="container">
    <div class="row">
      <div>
        <div class="registration-form">
          <h2 class="text-center">Login</h2>
          <form action="#" method="post" @submit.prevent="login">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text h-100" id="basic-addon1"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                aria-describedby="basic-addon1" v-model="username">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text h-100" id="basic-addon1"><i class="fas fa-lock"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Password" aria-label="Username"
                aria-describedby="basic-addon1" v-model="password">
            </div>
            <div class="button-container d-flex justify-content-center align-items-end h-100">
              <button class="btn btn-register btn-primary w-100">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      username: "",
      password: "",
    }
  },

  methods: {
      async login() {
			if (this.username === "" || this.password === "") {
				const toast = useToast();
				toast.add({ title: 'Please fill in all credentials.', color: 'red' })
				return;
			}

          	try {
				const requestBody = {
					username: this.username,
					email: this.email,
					password: this.password
				}

				const response = await fetch('http://localhost:3000/api/user/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(requestBody)
				});

				const json = await response.json();
				if(!json.success) {
					const toast = useToast();
					toast.add({ title: 'Wrong credentials', color: 'red' })
					return;
				}

        localStorage.setItem('user_id', json.user_id)

				window.location.href = '/'
				
			} catch (error) {
				console.log(error);
			}
       }
    } 
}
</script>

<style>
body {
  background-color: #FAF9F6;
  height: 100vh;
}

h2 {
  font-size: 30px;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-form {
  background-color: white;
  min-width: 550px;
  min-height: 250px;
  padding: 20px 50px;
  border-radius: 15px;
}

.input-group {
  margin: 25px 0;
}

.btn-register {
  margin-top: 15px;
  background-color: #77a4ed;
  border: #77a4ed
}</style>
