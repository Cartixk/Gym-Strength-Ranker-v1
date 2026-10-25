let strengthStandards = {
    male: {
        squat: { beginner: 0.75, novice: 1.0, intermediate: 1.5, advanced: 1.75, elite: 2.5 },
        bench: { beginner: 0.5, novice: 0.75, intermediate: 1.0, advanced: 1.5, elite: 1.75 },
        deadlift: { beginner: 1.0, novice: 1.25, intermediate: 1.75, advanced: 2.25, elite: 2.75 },
        ohp: { beginner: 0.35, novice: 0.55, intermediate: 0.75, advanced: 1.0, elite: 1.25 },
        bor: { beginner: 0.4, novice: 0.6, intermediate: 0.9, advanced: 1.2, elite: 1.5 }
    },
    female: {
        squat: { beginner: 0.5, novice: 0.65, intermediate: 1.0, advanced: 1.25, elite: 1.75 },
        bench: { beginner: 0.3, novice: 0.45, intermediate: 0.6, advanced: 0.9, elite: 1.15 },
        deadlift: { beginner: 0.65, novice: 0.85, intermediate: 1.15, advanced: 1.5, elite: 1.9 },
        ohp: { beginner: 0.2, novice: 0.35, intermediate: 0.5, advanced: 0.65, elite: 0.85 },
        bor: { beginner: 0.25, novice: 0.4, intermediate: 0.6, advanced: 0.8, elite: 1.0 }
    }
};

let rankImages = {
    Beginner: "beginner.png",
    Novice: "novice.png",
    Intermediate: "intermediate.png",   
    Advanced: "advanced.png",
    Elite: "elite.png"
};


let RankImg = document.querySelector("[data-ranking]");
let RankName = document.querySelector("[data-rankname]");
let OneRM = document.querySelector("[data-onerm]");
let Ratio = document.querySelector("[data-ratio]");


let BodyWeight = document.querySelector(".bw");
let Gender = document.querySelector(".gender");
let Exercises = document.querySelector(".exercises");
let Weight = document.querySelector(".lift");
let Reps = document.querySelector(".reps");
let Calculatebtn = document.querySelector(".btn");
let FinalResult = document.querySelector("[data-result]");
let ErrorMsg = document.querySelector("[data-error]");

//close popup
document.querySelector(".close-result").addEventListener("click", () => {
    FinalResult.classList.remove("active");
});
FinalResult.addEventListener("click", (e) => {
    if (e.target === FinalResult) {
        FinalResult.classList.remove("active");
    }
});

//btn
Calculatebtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let bodyweight = Number(BodyWeight.value);
    let gender = Gender.value;
    let exercise = Exercises.value;
    let weight = Number(Weight.value);
    let reps = Number(Reps.value);
    // console.log({bodyweight, gender, exercise, weight, reps});
    
    if(!bodyweight || !gender || !exercise || !weight || !reps || bodyweight <= 0 || weight <= 0 || reps <= 0){
        ErrorMsg.innerText = "Please fill out all the fields with valid positive values";
        ErrorMsg.style.display = "block";  //show error hide result
        FinalResult.classList.remove("active");
        return;
    }
    ErrorMsg.style.display = "none";  //display

    let result = calculaterank(bodyweight, gender, exercise, weight, reps);
    console.log(result);

    RankName.innerText = result.rank;
    OneRM.innerText = `Estimated oneRM: ${result.oneRM} kgs`;
    Ratio.innerText = `Ratio: ${result.ratio}`;
    RankImg.src = rankImages[result.rank];


    FinalResult.classList.add("active");
});
function calculaterank(bodyweight, gender, exercise, weight, reps){
    let oneRM = weight * (1 + reps/30);
    let ratio = oneRM/bodyweight;
    let standards = strengthStandards[gender][exercise];
    let rank = "Beginner";
    if(ratio >= standards.elite) rank = "Elite";
    else if(ratio >= standards.advanced) rank = "Advanced";
    else if(ratio >= standards.intermediate) rank = "Intermediate";
    else if(ratio >= standards.novice) rank = "Novice";
    else if(ratio >= standards.beginner) rank = "Beginner";
    else rank = "Beginner";

    return {oneRM: oneRM.toFixed(2), ratio: ratio.toFixed(2), rank};
}