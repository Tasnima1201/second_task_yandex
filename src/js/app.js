import '../css/style.css';
import { classrooms, courses } from './schedule/schedule.js'

courses.add("Школа мобильной разработки",36);
courses.add("Школа дизайна интерфейсов",50);

classrooms.add('Синий кит',100,"2 подъезд 2 этаж");
classrooms.add('Зеленый горошек',30,"4 подъезд 3 этаж");

courses.list[0].addLecture("Лекция 1","Андрей Иванов","2017-03-01","18:00","19:30",'Синий кит');
courses.list[0].addLecture("Лекция 2","Александр Морозов","2017-03-10","18:00","19:30",'Синий кит');
courses.list[0].addLecture("Лекция 3","Владимир Николаев","2017-03-25","18:00","19:30",'Синий кит');
courses.list[0].addLecture("Лекция 4","Илья Прокопенко","2017-04-03","18:00","19:30",'Синий кит');

courses.list[1].addLecture("Лекция1","Илья Бандаренко","2017-04-13","18:00","19:30",'Синий кит');


if (document.documentElement.hidden === undefined) {
    Object.defineProperty(Element.prototype, "hidden", {
      set: function(value) {
        this.setAttribute('hidden', value);
      },
      get: function() {
        return this.getAttribute('hidden');
      }
    });
}

let sourceCourse=document.getElementById("course-template").innerHTML;
let sourceCourseInfo=document.getElementById("course_info-template").innerHTML;
let sourceLecture=document.getElementById("lecture-template").innerHTML;
let sourceClassroomInfo=document.getElementById("classroom_info-template").innerHTML;

let templateCourse=Handlebars.compile(sourceCourse);
let templateCourseInfo=Handlebars.compile(sourceCourseInfo);
let templateLecture=Handlebars.compile(sourceLecture);
let templateClassroomInfo=Handlebars.compile(sourceClassroomInfo);



//Список всех курсов
function showCourses(){
	//удаление всех элементов
	let el=document.querySelector(".all_courses");
	let ch=el.querySelectorAll('.course_info');
	for (let i = 1, len = ch.length; i < len; i++){
		el.removeChild(ch[i]);
	}
	//обновление
	for (let i=0, len = courses.list.length; i < len;i++){
		let course=courses.list[i];
		let html=templateCourseInfo(course);
		let o = document.createElement("div");
		o.innerHTML = html;
		o.className="course_info";		
		el.appendChild(o);
	}
	//событие: при нажатии на школу показать форму для редактирования
	let cn=document.querySelectorAll('.course_info>ul');
	for (let i = 1, len=cn.length; i<len; i++){

		cn[i].addEventListener('click', (evt) => {

			let form = document.getElementById('change_course');
			let c_id = evt.target.parentElement.dataset.id;
			let form_el = form.elements;
			let c = courses.list.find( (el) => el.id==c_id);

			form_el[0].value=c.name;
			form_el[1].value=c.numStudents;
			form.hidden=false;

			evt.target.parentElement.parentElement.appendChild(form);
		});
	}
}

//Список всех аудиторий
function showClassrooms(){
	//удаление всех элементов
	let el=document.querySelector(".all_classrooms");
	let ch=el.querySelectorAll('.classroom_info');
	for (let i = 1, len = ch.length; i < len; i++){
		el.removeChild(ch[i]);
	}
	//обновление
	for (let i=0, len = classrooms.list.length; i < len;i++){
		let classroom = classrooms.list[i];
		let html = templateClassroomInfo(classroom);
		let o = document.createElement("div");
		o.innerHTML = html;
		o.className="classroom_info";		
		el.appendChild(o);
	}
	//событие: при нажатии на школу показать форму для редактирования
	let cn=document.querySelectorAll('.classroom_info>ul');
	for (let i = 1, len=cn.length; i<len; i++){

		cn[i].addEventListener('click', (evt) => {

			let form = document.getElementById('change_classroom');
			let c_id = evt.target.parentElement.dataset.id;
			let form_el = form.elements;
			let c = classrooms.list.find( (el) => el.id==c_id);
			
			form_el[0].value=c.name;
			form_el[1].value=c.capacity;
			form_el[2].value=c.location;
			form.hidden=false;

			evt.target.parentElement.parentElement.appendChild(form);
		});
	}
}

function showSchedule(){
	let el=document.querySelector(".all_lectures .schedule");
	let ch=el.children;
	for (let i = 0, len = ch.length; i < len; i++){
		el.removeChild(ch[0]);
	}

	for (let i=0, len = courses.list.length; i < len;i++){
		let course=courses.list[i];
		let html=templateCourse(course);

		let o = document.createElement("div");
		o.innerHTML = html;
		o.className="course c"+courses.list[i].id;
		
		document.querySelector(".schedule").appendChild(o);


		for (let j=0,l=courses.list[i].lectures.length; j<l;j++){

			let lect_obj=courses.list[i].lectures[j];
			lect_obj['classroom'] = classrooms.list.find((el) => el.id==lect_obj.classroomId).name;
			let htmlLect=templateLecture(courses.list[i].lectures[j]);

			let lect = document.createElement("li");
			lect.innerHTML=htmlLect;
			lect.className="lecture_info";
			document.querySelector(".schedule .c"+courses.list[i].id+" .course_schedule ul").appendChild(lect);

		}

		//событие: при нажатии на лекцию показать форму для редактирования
	
	}
	let cn=document.querySelectorAll('.lecture_info>ul');
	for (let i = 1, len=cn.length; i<len; i++){
		cn[i].addEventListener('click', (evt) => {
			let form = document.getElementById('change_lecture');
			let l_id = evt.target.parentElement.dataset.id;
			let c_id = evt.target.parentElement.parentElement.parentElement.dataset.id;
			
			let form_el = form.elements;
			
			let c = courses.list.find( (el) => el.id==c_id);

			let l = c.lectures.find( (el) => el.id==l_id);

			form_el[0].value=c.name;
			form_el[1].value=l.name;
			form_el[2].value=l.lecturer;
			form_el[3].value=l.date;
			form_el[4].value=l.begin;
			form_el[5].value=l.end;
			form_el[6].value=classrooms.get(l.classroomId).name;
			form.hidden=false;

			evt.target.parentElement.parentElement.appendChild(form);
		});
	}
}


function reloadSelectors(){
	let selectCourse=document.querySelectorAll(".choose_course");
	let o;
	for (let j = 0, l = selectCourse.length; j< l; j++){
		selectCourse[j].innerHTML="";
		for (let i = 0, len = courses.list.length; i < len; i++) {	
			o = document.createElement("option");
			o.innerHTML = courses.list[i].name;
			selectCourse[j].appendChild(o);
		}
	};

	let selectClassroom=document.querySelectorAll(".choose_classroom");
	for (let j = 0, l = selectClassroom.length; j < l; j++){
		selectClassroom[j].innerHTML="";
		for (let i = 0, len = classrooms.list.length; i < len; i++) {		
			let o = document.createElement("option");
			o.innerHTML = classrooms.list[i].name;
			selectClassroom[j].appendChild(o);
		}
	};
}


function getFromForm(className){
	let form = document.querySelector("#" + className);
	let params=[];

	for (let i = 0; i < form.elements.length-1; i++){
		let v = form.elements[i].value;
		if ((v==undefined) || (v==[]) ||(v=="")){
			alert("Введите все параметры");
			return
		}
		params.push(v);
	}
	return params;
}


reloadSelectors();


showCourses();
//Обновление данных о школах
document.getElementById('change_course').addEventListener('submit',(evt) => { 
	evt.preventDefault();
	let params=getFromForm("change_course");

	let c_id = evt.target.previousElementSibling.dataset.id;
	let c = courses.list.find( (el) => el.id == c_id);
	c.update( params[0], params[1]);

	document.querySelector(".all_courses").appendChild(document.getElementById('change_course'));
	showCourses();
	reloadSelectors();
	evt.target.hidden = true;
});
//Добавить курс
document.getElementById('add_course').addEventListener('submit',(evt) => { 
	let form = document.getElementById('add_course');
	evt.preventDefault();
	let params=getFromForm("add_course");
	courses.add(params[0],params[1]);
	reloadSelectors();
	form.reset();

	showCourses();
});

showClassrooms();
//Обновление данных об аудиториях
document.getElementById('change_classroom').addEventListener('submit',(evt) => { 
	evt.preventDefault();
	let params=getFromForm("change_classroom");

	let c_id = evt.target.previousElementSibling.dataset.id;
	let c = classrooms.list.find( (el) => el.id == c_id);
	c.update( params[0], params[1], params[2]);

	document.querySelector(".all_classrooms").appendChild(document.getElementById('change_classroom'));	
	showClassrooms();
	evt.target.hidden = true;
});
// Добавить аудиторию
document.getElementById('add_classroom').addEventListener('submit',(evt) => { 
	let form = document.getElementById('add_classroom');
	evt.preventDefault();
	let params = getFromForm("add_classroom");
	classrooms.add(params[0], params[1], params[2]);
	reloadSelectors();
	form.reset();

	showClassrooms();
});

showSchedule();
//Обновление данных о лекциях
document.getElementById('change_lecture').addEventListener('submit',(evt) => { 
	evt.preventDefault();
	let params=getFromForm("change_lecture");

	let l_id = evt.target.previousElementSibling.dataset.id;
	let c_id = evt.target.previousElementSibling.parentElement.parentElement.dataset.id;
	let c = classrooms.list.find( (el) => el.name == params[6]);
	let course = courses.list.find((el) => el.id == c_id);
	course.lecture_update(l_id, params[1],params[2],params[3],params[4],params[5], c.id)
	document.querySelector(".all_lectures").appendChild(document.getElementById('change_lecture'));	
	showSchedule();
	evt.target.hidden = true;
});



document.getElementById('add_lecture').addEventListener('submit',(evt) => { 
	evt.preventDefault();
	let params=getFromForm("add_lecture");
	let c = courses.list.find(function(el) {return el.name==params[0]});
	c.addLecture(params[1],params[2],params[3],params[4],params[5],params[6]);
	showSchedule();
});

//Лекции для школы в интервале дат
document.getElementById('search_lecture_by_course').addEventListener('submit', (evt) => {
	evt.preventDefault();
	let params = getFromForm('search_lecture_by_course');
	let c = courses.list.find(function(el) {return el.name==params[0]} );
	let selected = c.getLecturesInDateInterval(params[1],params[2]);;

	let html=templateCourse(c);

	let o = document.createElement("div");
	o.innerHTML = html;
	o.className="course c"+c.id;

	let place=document.querySelector(".selected_lectures_for_course");
	place.innerHTML="";
	place.appendChild(o);

	for (let i = 0, len = selected.length; i < len; i++){
		let htmlLect=templateLecture(selected[i]);
		let lect = document.createElement("li");
		lect.innerHTML=htmlLect;
		lect.className="lecture"
		document.querySelector(".selected_lectures_for_course .c"+c.id+" .course_schedule ul").appendChild(lect);
	}
});


//Лекции в аудитории в интервале дат
document.getElementById('search_lecture_by_classroom').addEventListener('submit', (evt) => { 
	evt.preventDefault();
	let params = getFromForm("search_lecture_by_classroom");
	let classroom = classrooms.list.find(function(el) {return el.name==params[0]});

	let lects = classroom.getLecturesInDateInterval(params[1],params[2]);

	let place=document.querySelector(".selected_lectures_for_classroom");
	place.innerHTML="";
	for (let j = 0, l = lects.length; j < l;j++) {
		let c = courses.list[j];
		if (lects[j].length!=0){
			let html=templateCourse(c);

			let o = document.createElement("div");
			o.innerHTML = html;
			o.className="course c"+c.id;
			place.appendChild(o);

			for (let i = 0, len = lects[j].length; i < len; i++){
				let htmlLect = templateLecture(lects[j][i]);
				let lect = document.createElement("li");
				lect.innerHTML=htmlLect;
				lect.className="lecture"
				document.querySelector(".selected_lectures_for_classroom .c"+c.id+" .course_schedule ul").appendChild(lect);
			}
		}
	}

});