var fdcApi = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR&query=Cheddar%20Cheese";

var nutritionixApi = "https://trackapi.nutritionix.com/v2/search/instant?detailed=true&query=spaghettibolognese&api_key=fca954f6d34563952bd28e3af019024a";

//When a goal is selected after entering in gender, age, height, and weight then calcuate calories
        //BMR calculated using Mifflin St Jeor Formula
            //sedentary multiplier 1.15; light activity 1.2; moderate acitivity 1.4; very active 1.6; extra active 1.8
            //If user clicks Weight Loss multiply TDEE by 0.75
            //If user clicks Maintain current weight, just display TDEE
            //If user clicks Weight Gain, multiply TDEE by 1.1
    //If a required value is missing, notify the user to fix it

$("goal-buttons").on("click", function() {



})