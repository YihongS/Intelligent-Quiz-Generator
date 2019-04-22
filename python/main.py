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
    print("new",new)
    return new


def getCorrectList(lst):
    pool = []
    for item in lst:
        if item["Student_score_on_question"] > 0:
            pool.append(item["Answer_text"])
    return pool


def sortByResponseLength(lst):
    new = sorted(lst,key = lambda i: len(i['Answer_text']),reverse = True)
    return new

def getIncorrectList(lst):
    pool = []
    for item in lst:
        if item["Student_score_on_question"] == 0:
            pool.append(item["Answer_text"])
    print(len(pool))
    return pool


answerList = readAnswers()
sortedByQuiz = sortByQuizScore(answerList)
sortedCorrectPool = getCorrectList(sortedByQuiz)
sortedByLen = sortByResponseLength(answerList)
sortedIncorrectPool = getIncorrectList(sortedByLen)

with open('answerData.json', 'w') as f:
    json.dump(answerList, f)

with open('correctAnswerByScore.json', 'w') as f:
    json.dump(sortedCorrectPool, f)

with open('incorrectAnswerByLen.json', 'w') as f:
    json.dump(sortedIncorrectPool, f)












