import Classroom from "./Classroom.js"
import Course from "./Course.js"

export let classrooms = {
	list: [],
	add: function(name, capacity, location) {
		if (this.list.find(function(el) {return el.name == name }) == undefined)
			this.list.push(new Classroom(name, capacity, location));
		else
			alert('Аудитория с таким имененм уже создана') 
	},
	get: function(id){
		return this.list.find((el) => el.id == id)
	}
};

export let courses = {
	list: [],
	add: function(name, numStudents) {
		if (this.list.find(function(el) {return el.name == name }) == undefined)
			this.list.push(new Course(name, numStudents));
		else
			alert('Школа с таким имененм уже создана') 

	},
	get: function(id) {
		return this.list.find(function(course) {
			return course.id = id;
		});
	},
};











