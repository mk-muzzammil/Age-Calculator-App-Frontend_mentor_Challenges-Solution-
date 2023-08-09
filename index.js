const dayEle = document.querySelector("#day");
const monthEle = document.querySelector("#month");
const yearEle = document.querySelector("#year");
const arrowIconEle = document.querySelector("#arrowIcon");

const dayInputDivEle = document.querySelector(".dayInput");
const monthInputDivEle = document.querySelector(".monthInput");
const YearInputDivEle = document.querySelector(".yearInput");

const daylabelEle = document.querySelector("#dayLabel");
const monthlabelEle = document.querySelector("#monthLabel");
const yearlabelEle = document.querySelector("#yearLabel");
const inputsSectionELe = document.querySelector(".inputsSection");

// =================Output Selectors ===============
const yearOutputEle = document.querySelector("#yearsOutput");
const monthOutputEle = document.querySelector("#monthOutput");
const dayOutputEle = document.querySelector("#daysOutput");

// ===============All Spans =========
const inputSectionSpan = document.getElementById("inputSectionSpan");
const yearSpan = document.getElementById("yearSpan");
const monthSpan = document.getElementById("monthSpan");
const daySpan = document.getElementById("daySpan");

// =====================Displaying error messages ===================================
const displayErrorMessageSpan = (field, message) => {
  field.innerHTML = message;
};

// =======================Very important bcz we have clear all error messages when input is valid======================
const clearErrors = () => {
  daylabelEle.style.color = "";
  monthlabelEle.style.color = "";
  yearlabelEle.style.color = "";
};
const removeSpans = () => {
  inputSectionSpan.classList.remove("show-Error");
  yearSpan.classList.remove("show-Error");
  monthSpan.classList.remove("show-Error");
  daySpan.classList.remove("show-Error");
};
const removeInputFocuses=()=>{
  dayEle.classList.remove("show-Error-Input");
  yearEle.classList.remove("show-Error-Input");
  monthEle.classList.remove("show-Error-Input");
}

// ======================For randering data on scren ====================
const renderAgeOnScreen = (year, month, day) => {
  yearOutputEle.innerHTML = year;
  monthOutputEle.innerHTML = month;
  dayOutputEle.innerHTML = day;
};

const checkLeapYear = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
};
const validateYear = (year) => {
  if (year < 1 || year > new Date().getFullYear()) {
    return false;
  } else {
    return true;
  }
};
const validateMonth = (month) => {
  if (month < 1 || month > 12) {
    return false;
  } else {
    return true;
  }
};
const validateDay = (day, month, year) => {
  const daysInMonth = [
    31,
    checkLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if(validateMonth(month) && validateYear(year)){
    if (day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
    else {
      return true;
    }
  }
  else{
    return false;
  }

  
};

const dateValidation = (day, month, year) => {};

// =======================Main Function for extracting values from input and validate it ==============
const GetInputValues = () => {
  dayVal = +dayEle.value;
  monthVal = +monthEle.value;
  yearVal = +yearEle.value;

  // ==========================For validation of empty fields ==================
  if (dayVal && monthVal && yearVal) {
    clearErrors();
    removeSpans();
    removeInputFocuses();

    if (
      validateYear(yearVal) &&
      validateMonth(monthVal) &&
      validateDay(dayVal, monthVal, yearVal)
    ) {
      clearErrors();
      removeSpans();

      const birthDate = new Date(yearVal, monthVal - 1, dayVal);

      const todayDate = new Date();

      const ageDiff = todayDate - birthDate;

      const millisecondsInYear = 1000 * 60 * 60 * 24 * 365;
      const millisecondsInMonth = 1000 * 60 * 60 * 24 * 30;

      const year = Math.floor(ageDiff / millisecondsInYear);

      const month = Math.floor(
        (ageDiff % millisecondsInYear) / millisecondsInMonth
      );

      const day = Math.floor((ageDiff / (1000 * 24 * 60 * 60)) % 30) + 1;

      renderAgeOnScreen(year, month, day);
    }
    else{
      // =====================call imp to remove previous errors bcz everytime condition checked and new error will be displayed so no use of previous spans and errors
    clearErrors();
    removeSpans();
    removeInputFocuses();

      if(!validateYear(yearVal) || !validateMonth(monthVal) || !validateDay(dayVal,monthVal,yearVal)){
        if(!validateYear(yearVal)){
          yearlabelEle.style.color="red";
          yearSpan.classList.add("show-Error");
          yearEle.classList.add("show-Error-Input");
          displayErrorMessageSpan(yearSpan,"Must be in the past");
        }

        if(!validateMonth(monthVal)){
          monthlabelEle.style.color = "red";
          monthSpan.classList.add("show-Error");
          monthEle.classList.add("show-Error-Input");
          displayErrorMessageSpan(monthSpan, "Must be a Valid Month.");

        }

        if(!validateDay(dayVal,monthVal,yearVal)){
          daylabelEle.style.color = "red";
          daySpan.classList.add("show-Error");
          dayEle.classList.add("show-Error-Input");
          displayErrorMessageSpan(daySpan, "Must Be a Valid Day. ");

        }
        if (!validateDay(dayVal, monthVal, yearVal) && validateMonth(monthVal) && validateYear(yearVal)) {
          if (dayVal < 1 || dayVal > daysInMonth[monthVal - 1]) {
            daylabelEle.style.color = "red";
            daySpan.classList.add("show-Error");
            dayEle.classList.add("show-Error-Input");
            displayErrorMessageSpan(daySpan, "Must Be a Valid Date.");
          }
        }
        
        
      
      }
    

    }
  
  }
   else {
    clearErrors();
    removeSpans();
    removeInputFocuses();

    if (!yearVal || !monthVal || !dayVal) {
     
      if (!yearVal) {
        yearlabelEle.style.color = "red";
        yearSpan.classList.add("show-Error");
        yearEle.classList.add("show-Error-Input");
        displayErrorMessageSpan(yearSpan, "This Feild is required.");
      }
      if (!monthVal) {
        monthlabelEle.style.color = "red";
        monthSpan.classList.add("show-Error");
        monthEle.classList.add("show-Error-Input");
        displayErrorMessageSpan(monthSpan, "This Feild is required.");
      }
      if (!dayVal) {
        daylabelEle.style.color = "red";
        daySpan.classList.add("show-Error");
        dayEle.classList.add("show-Error-Input");
        displayErrorMessageSpan(daySpan, "This Feild is required.");
      }
    }
    
  }
};

arrowIconEle.addEventListener("click", GetInputValues);


