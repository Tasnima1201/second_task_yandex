import { counter } from './utils';
import { classrooms, courses } from './schedule';
import Lecture from './Lecture'

export default class Course{
	constructor(name, numStudents){
		this.id = counter.generateId();
		this.name = name;
		this.numStudents = numStudents;
		this.lectures = [];
	}

	update(name, numStudents){
		let c = courses.list.find((el) => el.name == name );
		if ((c==undefined) || (c.name == this.name)){
			this.name = name;
			this.numStudents = numStudents;	
		}
		else
			alert('Школа с таким имененм уже создана') 		
	}

	lecture_update(lectId, name, lecturer, date, begin, end, classroomId){
		let l = this.lectures.find((el) => el.id == lectId);
		let curClassroom = classrooms.get(classroomId);

		let collision = this.checkCollision(name, date, begin, end, curClassroom, l.id)
		if (!collision) {
			l.name = name;
			l.lecturer = lecturer;
			l.date = date;
			l.begin = begin;
			l.end = end;
			l.classroomId = classroomId;
		}
	}

	checkCollision(name, date, begin, end, curClassroom, sameLectId){	
		//проверка нет ли уже лекции с таким именем
		if (sameLectId == undefined) 
			sameLectId=0;

		let l = this.lectures.filter((el) => el.name == name);	
		if ((l.length > 1)||((l.length == 1) && (l[0].id != sameLectId))){
			alert('Лекция с таким именем уже создана');
			return true;
		}

		//проверка вместимости аудитории
		if (this.numStudents > curClassroom.capacity){
			alert("Недостаточно места в аудитории");
			return true;
		}

		//проверка пересечения лекций по времени для данной школы
		l = this.lectures.filter((el) => {
					return (el.date==date) && 
						   (((begin > el.begin) && (begin < el.end)) || 
						   ((end > el.begin) && (end < el.end)))})
		if ((l.length > 1)||((l.length == 1) && (l[0].id != sameLectId))) {
			alert("В данное время у этой группы другая лекция");
			return true;
		}
		//проверка занятости аудитории с другими школами в это время
		for (let i = 0, len = courses.list.length; i < len; i++) {
				let c = courses.list[i];
				if (c.name != name){
					//лекции в тот же день в той же аудитории
					let selected = c.lectures.filter(
						(el) => (el.date == date) && (el.classroomId == curClassroom.id));
					// лекции в то же время
					l = selected.filter((el) => { return (((begin>=el.begin)&&(begin<=el.end))||((end>=el.begin)&&(end<=el.end)));});
					if ((l.length > 1)||((l.length == 1) && (l[0].id != sameLectId))) {
						alert("Аудитория занята в это время");
						return true;
					}					
				}				
		}
		return false;
	}

	addLecture(name, lecturer, date, begin, end, classroomName) {
		let curClassroom = classrooms.list.find((el) => el.name == classroomName);
		let collision = this.checkCollision(name, date, begin, end, curClassroom);
		if (!collision) 
			this.lectures.push(new Lecture(name, lecturer, date, begin, end,curClassroom.id));
	}

	getLecturesInDateInterval(from,to){
		let selected=[];
		for (let i = 0, len = this.lectures.length;i < len; i++) {
			if ((this.lectures[i].date > from) && (this.lectures[i].date < to)){
				selected.push(this.lectures[i]);
			}
		}
		return selected;
	}
};

