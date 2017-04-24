import { counter } from './utils.js'

export default class Lecture {
	constructor(name,lecturer,date,begin,end,classroomId) {
		this.id=counter.generateId();
		this.name=name;
		this.lecturer=lecturer;
		this.date=date;
		this.begin=begin;
		this.end=end;
		this.classroomId=classroomId;
	}
}