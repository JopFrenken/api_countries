<template>
    <div class="container">
        <div class="row">
            <div >
                <div class="registration-form">
                    <h2 class="text-center">Register</h2>
                    <form action="#" method="post" @submit.prevent="register">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text h-100" id="basic-addon1"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1" v-model="username">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1" v-model="email">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text h-100" id="basic-addon1"><i class="fas fa-lock"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Password" aria-label="Username"
                                aria-describedby="basic-addon1" v-model="password">
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text h-100" id="basic-addon1"><i class="fas fa-lock"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="Confirm Password" aria-label="Username"
                                aria-describedby="basic-addon1" v-model="confirmPassword">
                        </div>
                        <div class="button-container d-flex justify-content-center align-items-end h-100">
                            <button class="btn btn-register btn-primary w-100">Register</button>
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
        return {
            username: "",
            password: "",
            confirmPassword: "",
            email: ""
        }
    },

    methods: {
        async register(){
            if(this.username === "" || this.email === "" || this.password === "")  {
                const toast = useToast();
                toast.add({ title: 'Please fill in all credentials.', color: 'red'})
                return;
            }

             if (this.password !== this.confirmPassword) {
                const toast = useToast(); // Access the toast using this.$toast
                toast.add({ title: 'Passwords do not match.', color: 'red' });
                return;
            }

            try {
                const requestBody = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }

                const response = await fetch('http://localhost:3000/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Set the content type to JSON
                    },
                    body: JSON.stringify(requestBody)
                });

                window.location.href = '/login';
            } catch (error) {
                console.error(error);
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

h2{
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
    padding: 20px 50px;
    border-radius: 15px;
    min-width: 550px;
}

.input-group {
    margin: 25px 0;
}

.btn-register {
    margin-top: 15px;
    background-color: #77a4ed;
    border: #77a4ed;
}</style>
