## Introduction

This is a simple To-Do application built off Django (including the Django REST Framework for API CRUD operations) and React.

## The task
This is an open-ended code challenge, the purpose is to show proficiency in both Django and React. 
You will create a new feature for this simple To-Do application. 

It can be anything you seem worthy of building, e.g. implementing a due-date for the to-do tasks, an in-progress status or attaching files to a task etc.

There is no time-limit, but it is not expected you spend more than 5 hours on the project. 

Remember, the purpose is **not** to create a finished project, but to show proficient skills in both worlds and create well-structured, working code.

Happy coding!

## Requirements
* Python3
* Pipenv

## Getting started
1. Clone the project to your machine ```$ git clone https://github.com/Custimy-io/django-code-challenge```
2. Navigate into the directory ```$ cd django-code-challenge```
3. Source the virtual environment ```$ pipenv shell```
4. Install the dependencies ```$ pipenv install```
5. Navigate into the frontend directory ```$ cd frontend```
5. Install the dependencies ```$ npm install```

## Run the application
You will need two terminals pointed to the frontend and backend directories to start the servers for this application.

1. Run this command to start the backend server in the ```[backend]``` directory: ```[python manage.py runserver]``` (You have to run this command while you are sourced into the virtual environment)
2. Run this command to start the frontend development server in the ```[frontend]``` directory: ```[npm run start]``` (This will start the frontend on the adddress [localhost:3000](http://localhost:3000))

## Submission
When you feel like you have arrived at a good solution, go ahead and zip up the project using the following command from the folder containing the whole project:

 ```zip -r submission.zip django-code-challenge/ -x "django-code-challenge/frontend/node_modules/*" "django-code-challenge/.git/*"ls```

A zip file named ```submission.zip``` will be created. Go ahead and upload the file to ```https://wetransfer.com/``` and set the recipient email to ```l.popp@custimy.io```

## Help
If you encounter any problems with the deployment of the application, or you have any questions regarding the actual task, 
please do not hesitate to send us an email at ```l.popp@custimy.io``` and we will quickly get back to you. 
Any such questions will **not** count towards your final assessment.

## Built With

* [React](https://reactjs.org) - A progressive JavaScript framework.
* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.

## Creator Credit

This demo app was originally built for a scotch.io (acquired in 2020 by DigitalOcean) article by [Jordan Irabor](https://github.com/Jordanirabor/django-todo-react).

This coding challenge by [Custimy.io](https://custimy.io) was created under the open-source license and is solely for educational purposes.