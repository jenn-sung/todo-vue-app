var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      tasks: [
        {
          id: 1,
          text: "Take out the garbage",
          completed: true
        },
        {
          id: 2,
          text: "Make the bed",
          completed: true
        },
        {
          id: 3,
          text: "Mow the lawn",
          completed: false
        },
        {
          id: 4,
          text: "Buy groceries",
          completed: false
        }

      ],
      taskId: "",
      taskText: "",
      taskCompleted: ""

    };


  
  },
  created: function() {},
  methods: {
    addTask: function() {
      console.log("hey");
      var newTask = {
        text: this.taskText,
        completed: this.taskCompleted
      };
      if (this.text !== '' || this.completed !== '') {
        this.tasks.push(newTask);
      }
      
      this.text = "";
      this.completed = "";
    },
    removeTask: function(inputTask) {
      var index = this.tasks.splice(index, 1);
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
