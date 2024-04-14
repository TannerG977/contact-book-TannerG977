<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import contactData from '@/contacts.json'

const contactsData = ref(JSON.parse(localStorage.getItem('contacts')) || contactData.contacts);
const searchTerm = ref('');
const sortOption = ref('lastName');

const filteredContacts = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  let sortedContacts = [...contactsData.value];

  if (sortOption.value === 'lastName') {
    sortedContacts.sort((a, b) => a.lastName.localeCompare(b.lastName))
  } else if (sortOption.value === 'firstName') {
    sortedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName))
  };

  if (!term) return sortedContacts;

  return sortedContacts.filter(contact =>
    contact.firstName.toLowerCase().includes(term) ||
    contact.lastName.toLowerCase().includes(term)
  );
});
</script>

<template>
  <h2 class="p-3">Contacts</h2>
  <div class="search-container d-flex justify-content-center align-items-center">
    <form class="searchbar" @submit.prevent>
      <input v-model.trim="searchTerm" class="form-control me-2" type="search" placeholder="Search Contacts"
        aria-label="Search">
    </form>

    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
        aria-expanded="false">
        Filter
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li @click="sortOption = 'lastName'"><a class="dropdown-item" href="#">A-Z Last Name</a></li>
        <li @click="sortOption = 'firstName'"><a class="dropdown-item" href="#">A-Z First Name</a></li>
      </ul>
    </div>
  </div>

  <div class="contact-container justify-content-center align-items-center">
    <ul class="text-center">
      <li class="d-flex justify-content-center" v-for="contact in filteredContacts" :key="contact.id">
        <RouterLink :to="{ name: 'contact', params: { id: contact.id } }">
          <div class="contact m-3 border border-primary p-2 rounded shadow">
            {{ contact.firstName }} {{ contact.lastName }}
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style>
.searchbar {
  width: 50%;
}

.search-container {
  margin-top: 75px;
}

.contact {
  width: 250px;
  text-align: center;
}

ul {
  list-style-type: none;
}
</style>
