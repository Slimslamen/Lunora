import json

# Read the exercise.json file to create a mapping
def load_exercise_mapping():
    with open('JSON/exercise.json', 'r') as f:
        exercises = json.load(f)
    
    # Create a mapping from exercise name to exercise_id
    mapping = {}
    for exercise in exercises:
        mapping[exercise['name']] = exercise['exercise_id']
    
    return mapping

# Update workouts.json with exercise_ids
def update_workouts():
    # Load the exercise mapping
    exercise_mapping = load_exercise_mapping()
    
    # Read the workouts.json file
    with open('JSON/workouts.json', 'r') as f:
        workouts = json.load(f)
    
    # Track exercises that don't have a mapping
    missing_exercises = set()
    updated_count = 0
    
    # Iterate through all workouts
    for workout in workouts:
        if 'exercises' in workout:
            for exercise in workout['exercises']:
                if 'name' in exercise:
                    exercise_name = exercise['name']
                    if exercise_name in exercise_mapping:
                        # Add the exercise_id to the exercise object
                        exercise['exercise_id'] = exercise_mapping[exercise_name]
                        updated_count += 1
                    else:
                        missing_exercises.add(exercise_name)
    
    # Write the updated workouts back to the file
    with open('JSON/workouts.json', 'w') as f:
        json.dump(workouts, f, indent=2)
    
    print(f"Updated {updated_count} exercises with exercise_ids")
    
    if missing_exercises:
        print(f"\nExercises without matching IDs:")
        for exercise in sorted(missing_exercises):
            print(f"  - {exercise}")
    
    return updated_count, missing_exercises

if __name__ == "__main__":
    update_workouts()
