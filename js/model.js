export default class Model extends EventTarget{

    constructor(){
        super();

        this.exercises = [0,0,0,0,0,0,0,0];
        this.exam = 0;
        this.attendance = 100;
    }

    setExercise(index,value){
        this.exercises[index] = Number(value);
        this.update();
    }

    setExam(value){
        this.exam = Number(value);
        this.update();
    }

    setAttendance(value){
        this.attendance = Number(value);
        this.update();
    }

    isPositive(points){
        return points >= 51;
    }

    getWorstExerciseIndex(){
        return this.exercises.indexOf(Math.min(...this.exercises));
    }

    calculateExerciseGrade(){

        const worstIndex = this.getWorstExerciseIndex();

        let sum = 0;

        this.exercises.forEach((value,index)=>{
            if(index !== worstIndex){
                sum += value;
            }
        });

        return (sum / 700) * 100;
    }

    positiveExercisesCount(){

        return this.exercises.filter(x => x >= 51).length;
    }

    calculateFinalGrade(){

        const exerciseGrade = this.calculateExerciseGrade();

        return (exerciseGrade * 0.6) + (this.exam * 0.4);
    }

    getFinalText(){

        const grade = this.calculateFinalGrade();

        if(grade <= 50) return "Nicht Genügend";
        if(grade <= 61) return "Genügend";
        if(grade <= 74) return "Befriedigend";
        if(grade <= 86) return "Gut";

        return "Sehr Gut";
    }

    isFinalPositive(){

        const positiveExercises =
            this.positiveExercisesCount() >= 6;

        return (
            positiveExercises &&
            this.exam >= 51 &&
            this.attendance >= 80
        );
    }

    getProblems(){

        const problems = [];

        if(this.exam < 51){
            problems.push("Klausur negativ");
        }

        if(this.positiveExercisesCount() < 6){
            problems.push("Zu wenig positive Übungen");
        }

        if(this.attendance < 80){
            problems.push("Anwesenheit unter 80%");
        }

        return problems;
    }

    update(){

        this.dispatchEvent(
            new CustomEvent("gradesChanged")
        );
    }
}