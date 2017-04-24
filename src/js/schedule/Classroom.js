import { counter } from './utils'
import { classrooms, courses } from './schedule'

export default class Classroom{
	constructor(name,capacity,location){
		this.id = counter.generateId();
		this.name = name;
		this.capacity = capacity;
		this.location = location;
	}

	update(name,capacity,location){
		let c = classrooms.list.find(function(el) {return el.name == name });
		if (((c == undefined) || c.name==this.name) && (this.capacity<1000)){
			this.name = name;
			this.capacity = capacity;
			this.location = location;
		}
		else
			alert('Аудитория с такием именем уже создана или вместимость слишком велика');
		
	}

	getLecturesInDateInterval(from,to){
	let lects=[];
	let cur_id=this.id;
	for (let j = 0, l = courses.list.length; j < l;j++) {
		let c = courses.list[j];
		console.log(c.lectures);
		let selected = c.lectures.filter(function(el) {console.log(el.classroomId,cur_id); return (el.classroomId == cur_id) && (el.date >= from) && (el.date <= to)});
		lects.push(selected);
	}
	console.log(lects);
	return lects;
};
};
