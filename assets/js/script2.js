//selecting all required elements
const start_btn = $(".start_btn button");
const info_box = $(".info_box");
const exit_btn = $(".buttons .quit");
const continue_btn = $(".buttons .restart");
const quiz_box = $(".quiz_box");
const result_box = $(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = $("header .time_line");
const timeText = $(".timer .time_left_txt");
const timeCount = $(".timer .timer_sec");
const quit_quiz = $(".buttons .quit");
const restart_quiz = $(".buttons .restart");

// if startQuiz button clicked
$(start_btn).click(function () {
  $(info_box).addClass("activeInfo"); //show info box
});

// if exitQuiz button clicked
$(exit_btn).click(function () {
  $(info_box).removeClass("activeInfo"); //show info box
});

// reload page
$(quit_quiz).click(function () {
  location.reload();
});

// restart quiz
$(restart_quiz).click(function () {
  $(result_box).removeClass("activeResult");
  $(quiz_box).addClass("activeQuiz");
  timeValue = 60;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  questionCounter(que_numb);
  showQuestions(que_count);
  clearInterval(counter);
  startTimer(timeValue);
});

// if continueQuiz button clicked
$(continue_btn).click(function () {
  $(info_box).removeClass("activeInfo"); //hide info box
  $(quiz_box).addClass("activeQuiz"); //show quiz box
  showQuestions(0); //calling showQestions function
  questionCounter(1); //passing 1 parameter to queCounter
  startTimer(60); //calling startTimer function
});

let timeValue = 60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let widthValue = 0;

var next_btn = $(".next_btn");
next_btn.addClass("show");

//If next button is clicked
$(next_btn).click(function () {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    questionCounter(que_numb);
  } else {
    console.log("Questions completed");
    showResultBox();
  }
});

// getting questions and options from array
function showQuestions(index) {
  const que_text = $(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index

  let que_tag =
    "<span>" +
    questions[index].number +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option">' +
    questions[index].options[0] +
    "<span></span></div>" +
    //---- next option
    '<div class="option">' +
    questions[index].options[1] +
    "<span></span></div>" +
    //---- next option
    '<div class="option">' +
    questions[index].options[2] +
    "<span></span></div>" +
    //---- next option
    '<div class="option">' +
    questions[index].options[3] +
    "<span></span></div>";

  $(que_text).html(que_tag);
  $(option_list).html(option_tag);
  const option = $(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "checkSelection(this)");
  }
}

function questionCounter(index) {
  const bottom_ques_counter = $(".total_que");
  let totalQuesCounTag =
    "<span><p>" +
    index +
    "</p><p>of</p><p>" +
    questions.length +
    "</p>Questions</span>";
  bottom_ques_counter.html(totalQuesCounTag);
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    $(timeCount).text(time);
    time--;
    if (time < 0) {
      clearInterval(counter);
      $(timeCount).text("00");
    }
  }
}

function subtractTimer(amount) {
  var newTime = amount - time;
  return newTime;
}

function checkSelection(answer) {
  let useranswer = answer.textContent;
  let correctAnswer = questions[que_count].answer;
  let allOptions = option_list.children.length;

  if (useranswer == correctAnswer) {
    userScore += 1;
    console.log(userScore);
    $(answer).addClass("correct");
    console.log("Answer is Correct");
  } else {
    $(answer).addClass("incorrect");
    console.log("Answer is Wrong");
  }
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  $(next_btn).css("display", "block");
}

function showResultBox() {
  $(info_box).removeClass("activeInfo");
  $(quiz_box).removeClass("activeQuiz");
  $(result_box).addClass("activeResult");
  const scoreText = $(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span>Congrats!, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    $(scoreText).html(scoreTag);
  } else if (userScore > 1) {
    let scoreTag =
      "<span>You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    $(scoreText).html(scoreTag);
  } else {
    let scoreTag =
      "<span>Sorry, You only got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    $(scoreText).html(scoreTag);
  }
}
