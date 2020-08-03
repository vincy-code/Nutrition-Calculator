  var totalCal = 0;
  let calorieGoal = 0;
  const foods = [];
  var fdcApi =
    "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR&query=Cheddar%20Cheese";

  var fdcAPIList =
    "https://api.nal.usda.gov/fdc/v1/foods/list?api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR";

  // var nutritionixApi =
  //   "https://trackapi.nutritionix.com/v2/search/instant?detailed=true&query=" + selectedFood + "&api_key=fca954f6d34563952bd28e3af019024a";
  // note!!!! "selectedFood" might need to change based on the var we decide to go with
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
  var finalEnergy = 0;

  $("#loss-button").on("click", function () {
    var selectElement = $("#select");
    var output = selectElement.val();
    if (output === "female") {
      calculateMifflin();
      var energyNeeds = mifflin;
    } else {
      calculateMifflinM();
      var energyNeeds = mifflin;
    }
    finalEnergy = energyNeeds * 0.75;
    $("#mifflin").text(custRound(finalEnergy, 1) + " calories");
    console.log(finalEnergy);
    return finalEnergy;
  });

  $("#maintain-button").on("click", function () {
    var selectElement = $("#select");
    var output = selectElement.val();
    if (output === "female") {
      calculateMifflin();
      var energyNeeds = mifflin;
    } else {
      calculateMifflinM();
      var energyNeeds = mifflin;
    }
    finalEnergy = energyNeeds;
    $("#mifflin").text(custRound(finalEnergy, 1) + " calories");
    console.log(finalEnergy);
    return finalEnergy;
  });

  $("#gain-button").on("click", function () {
    var selectElement = $("#select");
    var output = selectElement.val();
    if (output === "female") {
      calculateMifflin();
      var energyNeeds = mifflin;
    } else {
      calculateMifflinM();
      var energyNeeds = mifflin;
    }
    finalEnergy = energyNeeds * 1.1;
    $("#mifflin").text(custRound(finalEnergy, 1) + " calories");
    console.log(finalEnergy);
    return finalEnergy;
  });

  //When generate meal plan button is clicked, the fdcAPI is searched and randomly grabs foods until the total calorie content of those foods is equal to the user's calculated calorie needs

  var fdcAPIFoodList = {
    url:
      "https://api.nal.usda.gov/fdc/v1/foods/list?pageNumber2&api_key=93FB5ZkYGDf50t9MdkGtFJZSj09FqLI9engO84mR",
    method: "GET",
    timeout: 0,
  };

  //function will keep grabbing random food items and adding their calories together until it equals the user's calculated calorie needs or within +-10% (finalEnergy variable ex. 1800 calories)

  // $.ajax(fdcAPIFoodList).done(function (response) {
  //   console.log(response);
  //   var obj_keys = Object.keys(response);
  //   var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
  //   selectedFood = response[ran_key];
  //   console.log(selectedFood);
  // 
  
  function getCalories(totalSoFar) {
    calorieGoal = Math.floor(finalEnergy);
    console.log("calorieGoal", calorieGoal);
    console.log(calorieGoal);
    
    // ajax call to get new food
    // get new food
    // var kcal = Math.floor(Math.random() * (calorieGoal / 2))
    $.ajax(fdcAPIFoodList).done(function (response) {
      console.log(response);
      var obj_keys = Object.keys(response);
      var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
      selectedFood = response[ran_key];
      var ctr = 0;
      var found = false;
      var kcal = 0;
      while (!found && ctr < selectedFood.foodNutrients.length) {
        if (selectedFood.foodNutrients[ctr].unitName.toLowerCase() === "kcal") {
          kcal = selectedFood.foodNutrients[ctr].amount;
          found = true;
        } else {
          ctr++;
        }
      };
      console.log("getCalories -> kcal", kcal);
      var lowRange = Math.floor(calorieGoal - calorieGoal * 0.1);
      var highRange = Math.ceil(calorieGoal + calorieGoal * 0.1);
      // if kcal + totalSoFar < (calorieGoal + 10%)
      var tmpTotal = kcal + totalSoFar;
      if (tmpTotal > highRange) {
        console.log("Too high");
        // kcal too large, so don't use it -- get another food
        getCalories(totalSoFar);
      } else if (tmpTotal < lowRange) {
        console.log("Adding food");
        foods.push(selectedFood); // name or id of food from api
        totalCal = totalCal + kcal;
        getCalories(totalCal);
      } else {
        // In range
        console.log("In the range");
        foods.push(selectedFood); // name or id of food from api
        totalCal = totalCal + kcal;
        for(var i=0; i<foods.length; i++){
        var p = document.createElement("p");
        p.innerHTML = JSON.stringify("Food Item: " + foods[i].description);
        $("#meal-plan").append(p);
      }
      }
      console.log(foods);
      return true;
      
     
    });

   
  };

 

  $("#mealBtn").on("click", () => getCalories(totalCal));

  
  
 