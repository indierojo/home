(function($) {
    Task = Backbone.Model.extend({
       taskText: null,
       taskContexts: null
    });

    Tasks = Backbone.Collection.extend({
       initialize: function(models, options){
           this.bind("add", options.view.addTaskToView);
       }
    });

    window.AppView = Backbone.View.extend({
        el: $("#appWrapper"),

        initialize: function() {
            this.tasks = new Tasks(null, {view: this});
        },

        events:{
            "keypress #addNewTask": "onNewTaskAdded"
        },

        onNewTaskAdded: function (e) {
            if (e.keyCode != 13) return;

            var taskText = $("#newTaskText").val();
            if(taskText)
            {
                var task = new Task({taskText: taskText, taskContexts: ["1", "2"]});
                this.tasks.add(task);

                $("#newTaskText").val('');
            }
        },
        addTaskToView: function(model){
            $("#taskList").append("<li>" + model.get('taskText'));
            var contexts = model.get('taskContexts');
            for (var i = 0; i < contexts.length; i++) {
                $("#taskList").append("@" + contexts[i]);
            }
            $("#taskList").append("</li>");
        }
    });

    window.App = new AppView();
}(jQuery));