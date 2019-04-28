import csv
import json

def readAnswers():
    data = list(csv.reader(open('Answers.csv', mode='r')))
    answerResult = []
    answerHead = data[0]
    for line in data[1:]:
        d = {}
        for i in range(len(answerHead)):
            if i in [1]:
                line[i] = int(line[i])
            if i in [2,4,5]:
                line[i] = float(line[i])
            d[answerHead[i]] = line[i]
        answerResult.append(d)
    return answerResult

def sortByQuizScore(lst):
    new = sorted(lst,key = lambda i: i['Quiz_score'], reverse = True)
    #print("new",new)
    return new


def getCorrectList(lst):
    pool = []
    for item in lst:
        if item["Student_score_on_question"] > 0:
            pool.append((item["Answer_text"], item["Question_id"]))
    return pool

def getNumOfQuestions(answerList):
    questions = set()
    for i in range(len(answerList)):
        d = answerList[i]
        questions.add(d["Question_id"])
    print(questions)
    return questions

def separateAnswerList(pool,numOfQuestions):
    result = []
    for i in range(1,len(numOfQuestions) + 1):
        lst = [i]
        for r in pool:
            if r[1] == i:
                lst.append(r[0])
        result.append(lst)
    print(result)
    return result

def sortByResponseLength(lst):
    new = sorted(lst,key = lambda i: len(i['Answer_text']),reverse = True)
    return new


def getIncorrectList(lst):
    pool = []
    for item in lst:
        if item["Student_score_on_question"] == 0:
            pool.append((item["Answer_text"],item["Question_id"]))
    #print(len(pool))
    return pool



def readQuestions():
    data = list(csv.reader(open("Questions.csv", mode = "r")))
    questionResult = []
    questionHead = data[0]
    for line in data[1:]:
        d = {}
        for i in range(len(questionHead)):
            if i in [1,5,7,9,11]:
                line[i] = int(line[i])
            d[questionHead[i]] = line[i]
        questionResult.append(d)
    return questionResult

answerList = readAnswers()
numOfQuestions = getNumOfQuestions(answerList)
sortedByQuiz = sortByQuizScore(answerList)
sortedCorrectPool = getCorrectList(sortedByQuiz)
correctList = separateAnswerList(sortedCorrectPool,numOfQuestions)
sortedByLen = sortByResponseLength(answerList)
sortedIncorrectPool = getIncorrectList(sortedByLen)
questionResult = readQuestions()
incorrectList = separateAnswerList(sortedIncorrectPool,numOfQuestions)



with open('answerData.json', 'w') as f:
    json.dump(answerList, f)
# What it is: This file contains all the information we can get from the answer.csv.
# Format: an array,containing all the objects (corresponding to each answer), each object has key and value pair, such like (key: Question ID, value: 1)



with open('correctAnswerByScore.json', 'w') as f:
    json.dump(correctList, f)

# What it is: This file is a pool of correct answers sorted by score
# Format: an 2D array (meaning array of arrays), each inner array is in format of ["question text...", question ID]


with open('incorrectAnswerByLen.json', 'w') as f:
    json.dump(incorrectList, f)

# What it is: This file is a pool of incorrect answers sorted by length
# Format: an 2D array (meaning array of arrays), each inner array is in format of ["question text...", question ID]


with open('questionData.json','w') as f:
    json.dump(questionResult, f)

# What it is: This file contains all the information we can get from the question.csv.
# Format: an array,containing all the objects (corresponding to each answer), each object has key and value pair, such like (key: Question ID, value: 1)












