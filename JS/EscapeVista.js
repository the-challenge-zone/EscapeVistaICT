//List for keeping track which tasks have points
var PointList = {"Rekenen": 0, "Hard- en Software": 0, "Database": 0, "AMO": 0, "CCCCC":0};
var LocationList = {};
//variables to make typing easier
var Arrow1 = document.getElementById("ImageArrow1");
var Arrow2 = document.getElementById("ImageArrow2");
var Arrow3 = document.getElementById("ImageArrow3");
var Arrow4 = document.getElementById("ImageArrow4");


//this function is called everytime a new destination is travelled to
function TravelPath(Destination){
    //travel through each destination in the ImageDataList array
    ImageDataList.forEach(i => {
        //if the Image ID is equal to the requested destination, perform the following acts
        if (i.ImageID == Destination) {
            //======================================================showthe image and move the arrow to the correct place=======================================
            //===========X coordinates=============
            Arrow1.setAttribute('x', i.Arrow1CoordsX);
            Arrow2.setAttribute('x', i.Arrow2CoordsX);
            Arrow3.setAttribute('x', i.Arrow3CoordsX);
            Arrow4.setAttribute('x', i.Arrow4CoordsX);
            //===========Y Coordinates=============
            Arrow1.setAttribute('y', i.Arrow1CoordsY);
            Arrow2.setAttribute('y', i.Arrow2CoordsY);
            Arrow3.setAttribute('y', i.Arrow3CoordsY);
            Arrow4.setAttribute('y', i.Arrow4CoordsY);
            //=============Image===================
            document.getElementById("ImageHolder").src='../IMAGES/School/'+i.ImageID+'.jpg';
            //==========Destinations===============
            Arrow1.setAttribute('onclick','TravelPath("'+i.Destination1+'")'); 
            Arrow2.setAttribute('onclick','TravelPath("'+i.Destination2+'")'); 
            Arrow3.setAttribute('onclick','TravelPath("'+i.Destination3+'")'); 
            Arrow4.setAttribute('onclick','TravelPath("'+i.Destination4+'")'); 
            //==========Arrow Directions===========
            Arrow1.setAttribute('href', '../IMAGES/Blue arrow '+i.Arrow1Direction+'.png');
            Arrow2.setAttribute('href', '../IMAGES/Blue arrow '+i.Arrow2Direction+'.png');
            Arrow3.setAttribute('href', '../IMAGES/Blue arrow '+i.Arrow3Direction+'.png');
            Arrow4.setAttribute('href', '../IMAGES/Blue arrow '+i.Arrow4Direction+'.png');
            //if the destination as a task, push that task through a function
            if (i.Task != null) {
                TaskQuestioning(i.Task);
            } else{
                //If the destination has no task, set the style of the taskholder div to none, so it is not continously displayed
                document.getElementById("Taskholder").style.display=("none");
            }
        } 
    })
}
function TaskQuestioning(QuestionTaskID){
    //empty variable to push the task to
    var TaskAnswers = [];
    //loop through the task array
    TaskList.forEach(j => {
        //if the correct task is found, proceed with the function
        if (QuestionTaskID == j.TaskID) {
            //set the display of the taskholder div to block to show it
            document.getElementById("Taskholder").style.display=("block");
            //if the task has a hint, it is a task the student must complete
            if (j.TaskHint != null) {
                //loop through the answers of the task
                for(k in j.TaskAnswers){
                    //add the answer to the variable
                    TaskAnswers.push("<label><input type='radio' name='TaskQuestion' value='"+k+"'> "+k+":"+j.TaskAnswers[k]+"</label><br>");
                };
                //convert the variable to a string
                TaskAnswers = TaskAnswers.toString();
                //clean de string, remove any unwanted , in the string
                TaskAnswersCleaned = TaskAnswers.replace(/,/g,"");
                //place the question along with the answers and hint in the task holder div.
                document.getElementById("Taskholder").innerHTML=j.TaskQuestion +"<br><br><form>"+TaskAnswersCleaned+"</form><button onclick=AnwserTask("+"'"+j.TaskID+"'"+","+"'"+j.TaskCorrectAnswer+"'"+")>Beantwoord vraag</button> <img id='TaskHint' src="+'"'+j.TaskHint+'"'+">";
            } 
            //if the task has no hint, it is a destination for the student to visit
            else{ 
                document.getElementById("Taskholder").innerHTML=j.TaskQuestion;
                LocationVisit(QuestionTaskID);
            }
        };
    });
}
//function is called if the visited destination is a location
function LocationVisit(LocationID){
    if (LocationList[LocationID] == null){
        LocationList.push(LocationID);
        LocationList[LocationID] = 25;  
    }
}
function AnwserTask(InputTask, TrueAnswer){
    //grab the value of the chosen answer
    var AnswerGiven = document.querySelector('input[name="TaskQuestion"]:checked').value;
    //check the given answer against the correct anser
    if (AnswerGiven == TrueAnswer) {
        //if the correct answer was given, set the points of the task to 50
        PointList[InputTask]=50;
        alert("Vraag beantwoord.");
    }else{
        //if the correct answer was not given, set the points of the task to 0.        
        PointList[InputTask]=0;
        alert("Vraag beantwoord.");
    }
}