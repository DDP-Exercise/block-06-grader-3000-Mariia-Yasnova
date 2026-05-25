export default class Controller{

    constructor(model,view){

        this.model = model;
        this.view = view;

        this.init();
    }

    init(){

        document
            .querySelectorAll(".exercise-input")
            .forEach(input=>{

                input.addEventListener("change",(e)=>{

                    const index =
                        e.target.dataset.index;

                    this.model.setExercise(
                        index,
                        e.target.value
                    );
                });
            });

        document
            .querySelector("#examInput")
            .addEventListener("change",(e)=>{

                this.model.setExam(
                    e.target.value
                );
            });

        document
            .querySelector("#attendanceInput")
            .addEventListener("change",(e)=>{

                this.model.setAttendance(
                    e.target.value
                );
            });

        this.model.addEventListener(
            "gradesChanged",
            ()=>{

                this.view.markWorst(
                    this.model.getWorstExerciseIndex()
                );

                this.view.renderResults(this.model);
            }
        );

        this.view.renderResults(this.model);
    }
}