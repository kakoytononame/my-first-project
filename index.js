import chalk from 'chalk';

const error = chalk.bold.red;
const succes = chalk.bold.blue;

var testMassiv = [
    {
        'Id': '1',
        'Text': 'Задача 1',
        'Status': 'Сделана'
    },
    {
        'Id': '2',
        'Text': 'Задача 2',
        'Status': 'Сделана'
    },
    {
        'Id': '3',
        'Text': 'Задача 3',
        'Status': 'Ошибка'
    }
]

function mapper(object) {
    return JSON.stringify(object)
}

function errorshandler(){
    if(Array.isArray(testMassiv) && testMassiv.length > 0){
        testMassiv.forEach(element => {
            if(element.Status === 'Ошибка'){
                console.log(error(mapper(element)))
            }
            if(element.Status === 'Сделана'){
                console.log(succes(mapper(element)))
            }
        });
    }
    else{
        console.log(error('Это не массив или он пустой'))
    }
}

// index.js

import Task from './task.js';

// Создаем экземпляры класса Task
const task1 = new Task(1, 'Сделать задачу', 'In Progress');
const task2 = new Task(2, 'Пойти в магазин', 'Pending');
const task3 = new Task(3, 'Пофиксить баг', 'Done');

// Выводим информацию о задачах в консоль
console.log(task1.toString());
console.log(task2.toString());
console.log(task3.toString());




