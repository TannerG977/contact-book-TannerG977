<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const contacts = ref(JSON.parse(localStorage.getItem('contacts')) || []);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');

const handleSubmit = (e) => {
  e.preventDefault();

  const newContact = {
    id: contacts.value.length > 0 ? contacts.value[contacts.value.length - 1].id + 1 : 1,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value
  };

  contacts.value.push(newContact);

  firstName.value = '';
  lastName.value = '';
  email.value = '';
  phone.value = '';

  localStorage.setItem('contacts', JSON.stringify(contacts.value));

  router.push('/');
};
</script>

<template>
  <div>
    <h2 class="p-3">Add a New Contact</h2>
    <div class="form-container">
      <form @submit="handleSubmit">
        <div class="form-group">
          <label for="firstname">First Name</label>
          <input v-model="firstName" type="text" class="form-control" id="firstname" placeholder="John">
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input v-model="lastName" type="text" class="form-control" id="lastname" placeholder="Doe">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input v-model="phone" type="tel" class="form-control" id="phone" placeholder="(xxx)-(xxx)-(xxxx)">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <div class="text-center mt-5">
      <RouterLink class="btn btn-dark" to="/">Back to Contacts</RouterLink>
    </div>
  </div>
</template>

<style>
form {
  width: 50%;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  padding-top: 10px;
}

.btn-primary {
  margin-top: 10px;
}
</style>
