# TOLQuizGenerator

This is an intelligent quiz question generator for the Tools for Online Learning course at Carnegie Mellon University. 

It allows students to ratake the question several times and get feedback. The retaking options are automatedly generated from previous students' self-explanation responses and are filtered and sorted by our models. This intelligent quiz generator allows learners to practice and get feedback on the knowledge they have't mastered while not increasing teacher's effort on producing new questions.

Try the intelligent quiz generator with a sample set of questions here: https://github.com/YihongS/TOLQuizGenerator

## Learn about our models behind retaking - Where each code lives:
The responses sorting function is written in Python, please find the main.py file in the "pyhton" folder.

The question retaking functions are written in Javascript, please find the main.js file in the "js" folder.

## If you want to use your own questions in the smart quiz generator, please:

1. Put your csv files (usually a question file and an answer file) under the "python" folder, refering to the format of the sample question and answer files.

2. Open the main.py file, change the file path to the path of your csv file in line 5 and line 64.
（If you find this tool useful and want a more non-coder friendly version for inputs of your own questions, please leave a comment and we would like to implement a user interface for uploading your file)

## Important note: 

Javascript doesn't allow scripts to read local JSON file. So please 

1. either try the prototype online (on the github server) 

2. or use a local host to run it (if you want to download the folder and change the csv file)
