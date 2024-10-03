import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

createApp(App)
.component('v-select', vSelect)
.mount('#app')
