/*global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Tasks",
      tasks: [],
      text: "", 
      completed: ""      
    };
  },
  created: function() {
    axios.get('/v1/tasks').then(function(response) {
      console.log(response.data);
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    addTask: function() {
      var params = {
        text: this.newTask.text,
        completed: this.newTask.completed
      };
      axios.post('/v1/tasks', params).then(function(response) {
        console.log(response.data);
        this.tasks.push(response.data);
      }.bind(this));
    },
    removeTask: function(inputTask) {
      console.log(inputTask);
      var index = this.tasks.indexOf(inputTask);
      console.log(index);
      this.tasks.splice(index, 1);
    },
    toggleCompleted: function(inputTask) {
      inputTask.completed = !inputTask.completed;
    }  
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});
