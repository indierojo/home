(function($) {
    Task = Backbone.Model.extend({
       taskText: null,
       taskContexts: null,
       taskDeadlines: null,
       taskCollaborators: null
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
                var task = parseTaskFrom(taskText);
                this.tasks.add(task);

                $("#newTaskText").val('');
            }
        },
        addTaskToView: function(model){
            var text = "<li>";
            var deadlines = model.get('taskDeadlines');
            for (var i = 0; i < deadlines.length; i++) {
                text += "<span class='deadline'>!" + deadlines[i] + "</span> ";
            }
            text += model.get('taskText');
            var contexts = model.get('taskContexts');
            for (var j = 0; j < contexts.length; j++) {
                text += "<span class='context'>@" + contexts[j] + "</span> ";
            }

            var collaborators = model.get('taskCollaborators');
            for (var k = 0; k < collaborators.length; k++) {
                text += "<span class='collaborator'>?" + collaborators[k] + "</span> ";
            }
            text += "</li>";
            $("#taskList").append(text);
        }
    });

    window.App = new AppView();

    window.parseTaskFrom = function(taskText){
        var contexts = getContexts(taskText);
        var deadlines = getTaskDeadlines(taskText);
        var collaborators = getTaskCollaborators(taskText);
        var text = getTextFrom(taskText, contexts, deadlines, collaborators);

        var task = new Task({taskText: text, taskContexts: contexts, taskDeadlines: deadlines, taskCollaborators: collaborators});
        return task;
    };

    window.getContexts = function(taskText){
        return getFlaggedValueFrom(taskText, '@');
    };

    window.getTaskCollaborators = function(taskText){
        return getFlaggedValueFrom(taskText, '?');
    };

    window.getTaskDeadlines = function(taskText){
        return getFlaggedValueFrom(taskText, '!');
    };

    window.getFlaggedValueFrom = function(taskText, flag){
        var values = [];
        var value = '';
        var parsingValue = false;
        var parsingFunction = false;
        for (var i = 0; i < taskText.length; i++) {
            if(parsingValue)
            {
                if(taskText[i] === '(' && value === '')
                {
                    parsingFunction = true;
                    continue;
                }

                if(taskText[i] === ')' && parsingFunction)
                {
                    values[values.length] = value;
                    parsingValue = false;
                    parsingFunction = false;
                    value = '';
                }

                if(taskText[i] === ' ' && !parsingFunction)
                {
                    values[values.length] = value;
                    parsingValue = false;
                    value = '';
                }
                else{
                    value += taskText[i];
                }
            }
            else if(taskText[i] === flag)
            {
                parsingValue = true;
            }
        }
        if(parsingValue)
        {
            values[values.length] = value;
        }

        return values;
    };

    window.getTextFrom = function(taskText, contexts, deadlines, collaborators)
    {
        var finalText = taskText;
        for (var i = 0; i < contexts.length; i++) {
            finalText = finalText.replace('@' + contexts[i], '');
            finalText = finalText.replace('@(' + contexts[i] + ')', '');
        }

        for (var j = 0; j < deadlines.length; j++) {
            finalText = finalText.replace('!' + deadlines[j], '');
            finalText = finalText.replace('!(' + deadlines[j] + ')', '');
        }

        for (var k = 0; k < collaborators.length; k++) {
            finalText = finalText.replace('?' + collaborators[k], '');
            finalText = finalText.replace('?(' + collaborators[k] + ')', '');
        }

        return finalText;
    };

}(jQuery));