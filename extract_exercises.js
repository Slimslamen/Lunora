const fs = require('fs');
const workouts = require('./JSON/workouts.json');

const allExercises = [];

workouts.forEach(workout => {
  if (Array.isArray(workout.exercises)) {
    workout.exercises.forEach(ex => {
    allExercises.push({
      workout_id: workout.id,
      phase: workout.phase,
      exercise_id: ex.exercise_id,
      name: ex.name,
      sets: ex.sets,
      reps: ex.reps && ex.reps !== ex.time ? ex.reps : null,
      time: ex.time || null
    });
    });
  }
});

fs.writeFileSync('./JSON/WorkoutExercises.json', JSON.stringify(allExercises, null, 2));
console.log('WorkoutExercises.json created!');