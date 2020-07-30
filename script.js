$( document ).ready(function() {


var fdcApi =
  "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR&query=Cheddar%20Cheese";

 var fdcAPIList =  "https://api.nal.usda.gov/fdc/v1/foods/list?api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR"


var nutritionixApi =
  "https://trackapi.nutritionix.com/v2/search/instant?detailed=true&query=spaghettibolognese&api_key=fca954f6d34563952bd28e3af019024a";

var mifflin = " ";
//When a goal is selected after entering in gender, age, height, and weight then calcuate calories
//BMR calculated using Mifflin St Jeor Formula
//sedentary multiplier 1.15; light activity 1.2; moderate acitivity 1.4; very active 1.6; extra active 1.8
//If a required value is missing, notify the user to fix it

//females
function calculateMifflin() {
    var age = $("#age").val().trim();
    var weight = $("#weight").val().trim();
    var height = $("#height").val().trim();
    var af = $("#af").val().trim();
    var weight2 = (weight / 2.2) * 10;
    var height2 = height * 2.54 * 6.25;
    var age2 = age * 5;
    mifflin = (weight2 + height2 - age2 - 161) * af;
    
    console.log(mifflin);
}

function custRound(x, places) {
  return Math.round(x * Math.pow(5, places)) / Math.pow(5, places);
}

//males
function calculateMifflinM() {
    var age = $("#age").val().trim();
    var weight = $("#weight").val().trim();
    var height = $("#height").val().trim();
    var af = $("#af").val().trim();
    var weight2M = (weight / 2.2) * 10;
    var height2M = height * 2.54 * 6.25;
    var age2M = age * 5;
    mifflin = (weight2M + height2M - age2M - 5) * af;

    console.log(mifflin);
}

//If user clicks Weight Loss multiply TDEE by 0.75
//If user clicks Maintain current weight, just display TDEE
//If user clicks Weight Gain, multiply TDEE by 1.1

$("#loss-button").on("click", function() {
    var selectElement = $("#select");
    var output = selectElement.val();
    if(output === "female") {
        calculateMifflin();
        var energyNeeds = mifflin; 
    }
    else {
        calculateMifflinM();
        var energyNeeds = mifflin;
    }
  var finalEnergy = energyNeeds * 0.75;
  $("#mifflin").text(custRound(finalEnergy, 1) + " calories");
  console.log(finalEnergy);
});

$("#maintain-button").on("click", function() {
    var selectElement = $("#select");
    var output = selectElement.val();
    if(output === "female") {
        calculateMifflin();
        var energyNeeds = mifflin; 
    }
    else {
        calculateMifflinM();
        var energyNeeds = mifflin;
    }
  var finalEnergy = energyNeeds;
  $("#mifflin").text(custRound(finalEnergy, 1) + " calories");
  console.log(finalEnergy);
});

$("#gain-button").on("click", function() {
    var selectElement = $("#select");
    var output = selectElement.val();
    if(output === "female") {
        calculateMifflin();
        var energyNeeds = mifflin; 
    }
    else {
        calculateMifflinM();
        var energyNeeds = mifflin;
    }
  var finalEnergy = energyNeeds * 1.1;
  $("#mifflin").text(custRound(finalEnergy, 1) + " calories");
  console.log(finalEnergy);
});

//When generate meal plan button is clicked, the fdcAPI is searched and randomly grabs foods until the total calorie content of those foods is equal to the user's calculated calorie needs

var settings = {
  "url": "https://api.nal.usda.gov/fdc/v1/foods/list?pageNumber2&api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});


// $.ajax({
//   url: fdcAPIList,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// })
});