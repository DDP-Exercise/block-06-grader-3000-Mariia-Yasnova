export default class View{

    constructor(){

        this.app = document.querySelector("#app");

        this.render();
    }

    render(){

        this.app.innerHTML = `
        
        <div class="container">

            <div class="left">

                <div class="section">

                    <h1>Grader 3000</h1>

                    <h2 class="exercise-title">
                        Übungsaufgaben
                    </h2>

                    <div class="exercise-grid" id="exerciseGrid"></div>

                </div>

                <div class="section">

                    <h2 class="exam-title">
                        Klausur
                    </h2>

                    <input 
                        type="number"
                        min="0"
                        max="100"
                        value="0"
                        id="examInput"
                        class="big-input"
                    >

                </div>

                <div class="section">

                    <h2 class="attendance-title">
                        Anwesenheit
                    </h2>

                    <input 
                        type="number"
                        min="0"
                        max="100"
                        value="100"
                        id="attendanceInput"
                        class="big-input"
                    >

                </div>

            </div>

            <div class="right">

                <div class="summary-box">
                    <h3 class="orange">
                        Übungsnote
                    </h3>

                    <div id="exerciseResult"></div>
                </div>

                <div class="summary-box">
                    <h3 class="gray">
                        Klausurnote
                    </h3>

                    <div id="examResult"></div>
                </div>

                <div class="summary-box">
                    <h3 class="yellow">
                        Anwesenheit
                    </h3>

                    <div id="attendanceResult"></div>
                </div>

                <div class="summary-box">
                    <h3 class="blue">
                        Gesamtnote
                    </h3>

                    <div id="finalResult"></div>
                </div>

                <div 
                    class="summary-box"
                    id="problemsBox"
                >
                    <h3>Probleme</h3>

                    <div id="problems"></div>
                </div>

            </div>

        </div>
        `;

        this.exerciseGrid =
            document.querySelector("#exerciseGrid");

        for(let i=0;i<8;i++){

            this.exerciseGrid.innerHTML += `
            
            <div class="exercise-card">
                <p>Übung ${i+1}</p>

                <input
                    type="number"
                    min="0"
                    max="100"
                    value="0"
                    class="exercise-input"
                    data-index="${i}"
                >
            </div>
            `;
        }
    }

    markWorst(index){

        document
            .querySelectorAll(".exercise-card")
            .forEach(card => {
                card.classList.remove("streichergebnis");
            });

        document
            .querySelectorAll(".exercise-card")
            [index]
            .classList
            .add("streichergebnis");
    }

    renderResults(model){

        document.querySelector("#exerciseResult")
            .innerHTML = `
            <div class="result orange">
                ${model.calculateExerciseGrade().toFixed(1)}%
            </div>
        `;

        document.querySelector("#examResult")
            .innerHTML = `
            <div class="result gray">
                ${model.exam}%
            </div>
        `;

        document.querySelector("#attendanceResult")
            .innerHTML = `
            <div class="result yellow">
                ${model.attendance}%
            </div>
        `;

        document.querySelector("#finalResult")
            .innerHTML = `
            <div class="final-grade">
                ${model.calculateFinalGrade().toFixed(1)}%
            </div>

            <div>
                ${model.getFinalText()}
            </div>
        `;

        const problems = model.getProblems();

        document.querySelector("#problems")
            .innerHTML =
            problems.length
                ? problems.join("<br>")
                : "Keine Probleme";

        const box =
            document.querySelector("#problemsBox");

        if(problems.length){
            box.classList.add("negative");
        }else{
            box.classList.remove("negative");
        }
    }
}