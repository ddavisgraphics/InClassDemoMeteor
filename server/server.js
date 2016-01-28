// Meteor Methods for Course
Meteor.methods({
    // inserts courses
    insertCourse:function(data){
        Courses.insert({
            uuid: data.uuid,
            name: data.name,
            teacher: data.teacher,
            username: Meteor.userId()
        });
    },
    // update courses
    updateCourse:function(data){
        Courses.update(data.id, {
            uuid: data.uuid,
            name: data.name,
            teacher: data.teacher,
            username: Meteor.userId()
        });
    },
    // removes all courses
    removeAllCourses:function(){
        Courses.remove({});
    },
    // removes just one course
    removeOneCourse:function(id){
        Courses.remove({_id:id});
    },
    // inserts a project
    insertProject:function(data){
        Projects.insert({
            projectName: data.projectName,
            description: data.description,
            completed: data.completed,
            due: data.date,
            course: data.course
        });
    },
    updateProject:function(data){
        Projects.update(data.id, {
            projectName: data.projectName,
            description: data.description,
            completed: data.completed,
            due: data.date,
            course: data.course
        });
    },
    // removes All Projects
    removeAllProjects:function(){
        Projects.remove({});
    },
    // removes projects by Course
    removeProjectsByCourse:function(courseID){
        Projects.remove({course:courseId});
    },
    // removes one project by its id
    removeOneProject:function(projectID){
        Projects.remove({_id:projectID});
    }
});

// Make this database reachable in the client side
Meteor.publish('getCourses', function(){
    return Courses.find();
});

Meteor.publish('getProjects', function(){
    return Projects.find();
});