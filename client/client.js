// Subscribe to the databases that are being published
Meteor.subscribe('getCourses');
Meteor.subscribe('getProjects');
// Meteor.call('removeAllCourses');

//Test the NEW DB by Creating an Insert
// var data = {
//     uuid: "GD105",
//     name: "Graphic Design 105",
//     teacher: "Mr. Plankton 2"
// };

// Meteor.call('insertCourse', data);

// Create the display variables
Template.usersCourses.helpers({
  courses: function(){
    return Courses.find().fetch();
  },
  name : function(){
    return this.name;
  },
  teacher: function(){
    return this.teacher;
  },
  project:function(){
    return Projects.find({course:this.uuid}).fetch();
  }
});

Template.usersCourses.events({
  'click .editCourse': function(event,template){
    event.preventDefault();
    Session.set("editCourse", this._id);
  },
  'click .deleteCourse': function(event,template){
    event.preventDefault();
    Meteor.call('removeOneCourse', this._id);
  },
  'click .deleteProject': function(event,template){
    event.preventDefault();
    Meteor.call('removeOneProject', this._id);
  },
  'click .editProject': function(event,template){
    event.preventDefault();
    Session.set("editProject", this._id);
  }
});

Template.insertCourse.helpers({
  edit: function(){
    var id = Session.get('editCourse');
    if(id){
      return Courses.findOne({_id:id});
    }
  },
  type: function(){
    var id = Session.get('editCourse');
    if(id){
      return "insertForm";
    } else {
      return "editForm";
    }
  }
});

Template.insertProject.helpers({
  edit: function(){
    var id = Session.get('editProject');
    if(id){
      return Projects.findOne({_id:id});
    }
  },
  type: function(){
    var id = Session.get('editProject');
    if(id){
      return "insertForm";
    } else {
      return "editForm";
    }
  },
  courses:function(){
    return Courses.find().fetch();
  },
  name : function(){
    return this.name;
  },
  uuid : function(){
    return this.uuid;
  }
});

Template.insertCourse.events({
  'submit .insertForm': function(event,template){
    event.preventDefault();

    var insertData = {
      uuid: event.target.uuid.value,
      name: event.target.courseName.value,
      teacher: event.target.teacher.value
    };

    Meteor.call('insertCourse', insertData);
  },
  'submit .updateForm':function(event,template){
    event.preventDefault();

    var insertData = {
      id: Session.get('editCourse'),
      uuid: event.target.uuid.value,
      name: event.target.courseName.value,
      teacher: event.target.teacher.value
    };

    // clear the form after insert
    event.target.reset();
    Session.set('editCourse', false);

    Meteor.call('updateCourse', insertData);
  }
});

Template.insertProject.events({
  'submit .insertForm': function(event,template){
      event.preventDefault();

      if($('.completedCheck').is(":checked")){
         var completed = "Yes";
      } else {
         var completed  = "No";
      }

      var insertData = {
        projectName: event.target.projectName.value,
        description: event.target.description.value,
        completed: completed,
        date: event.target.dueDate.value,
        course: event.target.course.value
      }

      Meteor.call('insertProject', insertData);

      // clear the form after insert
      event.target.reset();
  },
  'submit .updateForm': function(event,template){
      event.preventDefault();

      if($('.completedCheck').is(":checked")){
         var completed = "Yes";
      } else {
         var completed  = "No";
      }

      var insertData = {
        id: Session.get('editProject'),
        projectName: event.target.projectName.value,
        description: event.target.description.value,
        completed: completed,
        date: event.target.dueDate.value,
        course: event.target.course.value
      }

      console.log(insertData);
      Meteor.call('updateProject', insertData);

      // clear the form after insert
      // event.target.reset();
      // Session.set('editProject', false);
  }
});

// Setup date picker for the form so that dates are easier to add
Template.insertProject.rendered = function(){
   $('#datepicker').datepicker();
};

