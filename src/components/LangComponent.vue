<script setup>
import { onMounted, ref } from 'vue';
import { getProjects, getLocales, getTokensByProject, translateToken } from '../services/api';

defineProps({
  msg: String,
})

const projects = ref([]);
const locales = ref([]);
const tokens = ref([]);

const projectSelected = ref(null);
const localeSelected = ref(null);
const tokenSelected = ref(null);

const tokenSelect = ref(null);

const translatedPhrase = ref(null);

onMounted(() => {
  loadProjects();
  loadLocales();
});

// Methods

const loadProjects = async () => {
  projects.value = await getProjects();
  console.log(projects.value);
}

const loadLocales = async () => {
  const response = await getLocales();
  locales.value = response.map(locale => locale.code);

}

const getTokensFilteredByProjects = async () => {
  try {
    tokens.value = await getTokensByProject(projectSelected.value.id);
  } catch (error) {
    console.error('Error fetching project tokens:', error);
  }
}

const setSelectedToken = () => {
  tokenSelected.value = tokenSelect.value.id;
}

const translatePhrase = async () => {

  if(projectSelected.value && tokenSelected.value && localeSelected.value){

    const projectId = projectSelected.value;
    const tokenId = tokenSelected.value;
    const localeCode = localeSelected.value;
    try {
      const response = await translateToken(projectId, tokenId, localeCode);
  
      if (response.translation) {
        translatedPhrase.value = response.translation;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.message,
        });
      }
  
    } catch (error) {
      console.error('Error getting translation:', error);
    }
  } else {
    Swal.fire({
      text: "Please complete all fields.",
      icon: "warning"
    });
  }

}

</script>

<template>

  <h1 class="mb-3">{{ msg }}</h1>
  <div class="card p-3" style="width: 24rem;">

    <v-select
      class="mb-3"
      label="title"
      :options="projects"
      placeholder="Select a project"
      v-model="projectSelected"
      @option:selected="getTokensFilteredByProjects"
    />

    <v-select 
      class="mb-3" 
      label="token" 
      :options="tokens" 
      placeholder="Select a token" 
      v-model="tokenSelect"
      @option:selected="setSelectedToken" 
    />

    <v-select 
      class="mb-3" 
      label="code" 
      :options="locales"
      placeholder="Select a locale" 
      v-model="localeSelected"
      @option:selected="translatePhrase"
    />
    <textarea class="form-control" placeholder="Translation" readonly v-model="translatedPhrase"></textarea>
  </div>

</template>

<style scoped>
textarea {
  resize: none;
  outline: none;
  box-shadow: none;
}

textarea:focus {
  outline: none;
  box-shadow: none;
}
</style>