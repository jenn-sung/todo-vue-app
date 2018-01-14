/*global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Tasks",
      tasks: [],
      newTask: {id: 1, text: "", completed: false}
        
    };
  },
  created: function() {
    axios.get('/v1/tasks').then(function(response) {
      console.log(this);
      console.log(response.data);
      this.tasks = response.data;
    }.bind(this));
  },
  methods: {
    addTask: function() {
      console.log("hey");
      console.log(this.newTask);
      this.tasks.push(this.newTask);
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
