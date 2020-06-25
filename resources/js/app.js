/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
 
window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform'
import moment from 'moment'
import VueRouter from "vue-router"
import VueProgressBar from "vue-progressbar"
import swal from "sweetalert2"

//user defined components
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Users from './components/Users'
import Developer from './components/Developer'

/**
 * USER Defined Classes
 */
import Gate from './Gate'
//register our gate globally so we can access it anywhere in our app
Vue.prototype.$gate = new Gate(window.authUser)



window.vform = Form;
window.swal = swal;
window.Fire = new Vue()

const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer)
    toast.addEventListener('mouseleave', swal.resumeTimer)
  }
})

window.toast = toast;


/**
 * GLOBAL COMPONENTS (that can be used in views e.g <not-found></not-found>
 */

 //const { Form, HasError, AlertError } = window.vform

// Register the components
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
 
 

Vue.component(  'not-found', require('./components/NotFound').default );

Vue.component('pagination', require('laravel-vue-pagination'));
 
 
 //other modules and plugins
Vue.use(VueRouter);
const options = {
  color: 'yellow',
  failedColor: '#ff3300',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)





//FILTERS
//register global filters (functions than can be called to do some job on data. eg capitalization

Vue.filter ('capitalize', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});
 

Vue.filter ('formatDate', function(date){
    return moment(date).format('Do MMMM YYYY, h:mm:ss a'); // June 17th 2020, 7:43:58 pm
});
 


//FUNCTIONS

// OPTION 1: Using Mixin
Vue.mixin({
  methods: {
    hideModal: function(modalID) {
          $("#"+modalID).hide();
                
           $(".modal-backdrop").remove();
                 
        //  $('body').removeClass('modal-open')
                // .css('padding-right', '');
         
    },
    
        /*
     * removes an object from an array of objects
     * @param array array; the array of objects
     * @param elemID the id of the object to remove
     * NOTE that this function assumes the array contains objects and each has a unique 'id' attribute
     */
    removeElem: function(array, elemID) {
        $.each(array, function(i){
            if(array[i].id === elemID) {
                array.splice(i,1); 
                  return false; // breaks
            }

        });

        return array;
    }
    
  }
});


 


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

 //const files = require.context('./', true, /\.vue$/i)
 //files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);



 
const router  = new VueRouter ({
   routes:  [
        {path: "/dashboard", component: Dashboard},
        {path: "/profile", component: Profile},
        {path: "/users", component: Users},
        {path: "/developer", component: Developer},
        {path: "*", component: require('./components/NotFound').default}
    ],

    mode: 'history'
        
  }); 
  


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
     
    el: '#app',
    router,
    
    data: {
        searchText: ''
    },
    
    methods: {
        /*
         *call a debounce func  (in lodash) which accepts 3 params, a func, a time to wait b4 calling the func in ms and a set of optiona options
            
            the lodash library has already been included by defualt in resouces/js/botstrap.js in the line window._ = require('lodash');
         **/ 
        doSearch: _.debounce(() => {
            Fire.$emit("searching") 
        }, 500),
        
        /**
         * the old version
         * doSearch: () => {
            Fire.$emit("searching") 
            } ,
         */
    }
});
