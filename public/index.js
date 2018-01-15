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
      console.log('adding task...');
      var params = {
        text: this.text,
        completed: this.completed
      };
      axios.post('/v1/tasks', params).then(function(response) {
        this.tasks.push(response.data);
      }.bind(this));

      this.text = "";
      this.completed = "";
    },
    toggleCompleted: function(inputTask) {
      inputTask.completed = !inputTask.completed;
    },
    numberOfIncompleteTasks: function() {
      var count = 0;
      this.tasks.forEach(function(task) {
        if (task.compeleted === false) {
          count++;
        }

      })
      return count;
    },
    removeCompeletedTasks: function() {
      var incompleteTasks = [];
      for (var i = 0; i < this.tasks.length; i++) {
        if (!this.tasks[i].completed) {
          incompleteTasks.push(this.tasks[i]);
        }
      }
      this.tasks = incompleteTasks;
    },
    removeTask: function(inputTask) {
      console.log(inputTask);
      axios.delete('/v1/tasks/' + inputTask.id).then(function(response) {
        console.log(response.data);
        var index = this.tasks.indexOf(inputTask);
        this.tasks.splice(index, 1);
      }.bind(this))
    }, 
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
