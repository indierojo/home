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
                var contexts = getContextsFrom(taskText);
                var text = getTextFrom(taskText, contexts);

                var task = new Task({taskText: text, taskContexts: contexts});
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

    window.getContextsFrom = function(taskText){
        var contexts = [];
        var context = '';
        var parsingContext = false;
        for (var i = 0; i < taskText.length; i++) {
            if(parsingContext)
            {
                if(taskText[i] === ' ')
                {
                    contexts[contexts.length] = context;
                    parsingContext = false;
                    context = '';
                }
                context += taskText[i];
            }
            else if(taskText[i] === '@')
            {
                parsingContext = true;
            }
        }
        if(parsingContext)
        {
            contexts[contexts.length] = context;
        }

        return contexts;
    };

    window.getTextFrom = function(taskText, contexts)
    {
        var finalText = taskText;
        for (var i = 0; i < contexts.length; i++) {
            finalText = finalText.replace('@' + contexts[i], '');
        }

        return finalText;
    };

}(jQuery));