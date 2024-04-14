<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();
const contacts = ref(JSON.parse(localStorage.getItem('contacts')));
const contactId = parseInt(route.params.id);
const contactIndex = contacts.value.findIndex(contact => contact.id === contactId);

const contact = contacts.value[contactIndex];
let firstName = ref(contact ? contact.firstName : '');
let lastName = ref(contact ? contact.lastName : '');
let email = ref(contact ? contact.email : '');
let phone = ref(contact ? contact.phone : '');

const deleteContact = () => {
    if (contactIndex !== -1) {
        contacts.value.splice(contactIndex, 1)
        localStorage.setItem('contacts', JSON.stringify(contacts.value))
        router.push('/')
    };
};

const updateContact = () => {
    if (contactIndex !== -1) {
        contacts.value[contactIndex] = {
            ...contact,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value
        };

        localStorage.setItem('contacts', JSON.stringify(contacts.value));

        window.alert("Contact updated");
    };
};
</script>

<template>
    <div>
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button bg-warning" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#collapseOne' + contactId" aria-expanded="false"
                        :aria-controls="'collapseOne' + contactId">
                        Edit Contact
                    </button>
                </h2>
                <div :id="'collapseOne' + contactId" class="accordion-collapse collapse"
                    :aria-labelledby="'flush-headingOne' + contactId" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <form @submit.prevent="updateContact">
                            <div class="form-group">
                                <label for="firstname">First Name</label>
                                <input v-model="firstName" type="text" class="form-control" id="firstname"
                                    placeholder="John">
                            </div>
                            <div class="form-group">
                                <label for="lastname">Last Name</label>
                                <input v-model="lastName" type="text" class="form-control" id="lastname"
                                    placeholder="Doe">
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input v-model="email" type="email" class="form-control" id="email"
                                    placeholder="name@example.com">
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number</label>
                                <input v-model="phone" type="tel" class="form-control" id="phone"
                                    placeholder="(xxx)-(xxx)-(xxxx)">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact-container text-center">
            <h2>{{ firstName }} {{ lastName }}</h2>
            <p>{{ email }}</p>
            <p>{{ phone }}</p>
        </div>

        <div class="text-center mt-5">

            <button class="btn btn-danger" @click="deleteContact">Delete Contact</button>

            <RouterLink class="btn btn-dark ms-3" to="/">Back to Contacts</RouterLink>
        </div>

    </div>
</template>

<style>
.contact-container {
    text-align: center;
    padding-top: 75px;
}
</style>
