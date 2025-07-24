import json
import re

# Read exercise.json to create a mapping
with open('c:/Users/jimmo/OneDrive/Desktop/Lunora/JSON/exercise.json', 'r') as f:
    exercises = json.load(f)

# Create a mapping from name to exercise_id
name_to_id = {}
for exercise in exercises:
    name_to_id[exercise['name']] = exercise['exercise_id']

# Read workouts.json
with open('c:/Users/jimmo/OneDrive/Desktop/Lunora/JSON/workouts.json', 'r') as f:
    workouts = json.load(f)

# Update each workout's exercises
updated_count = 0
missing_exercises = []

for workout in workouts:
    if 'exercises' in workout:
        for exercise in workout['exercises']:
            if 'name' in exercise and 'exercise_id' not in exercise:
                exercise_name = exercise['name']
                if exercise_name in name_to_id:
                    exercise['exercise_id'] = name_to_id[exercise_name]
                    updated_count += 1
                else:
                    missing_exercises.append(exercise_name)
                    print(f"Warning: Exercise '{exercise_name}' not found in exercise.json")

# Write the updated workouts back to the file
with open('c:/Users/jimmo/OneDrive/Desktop/Lunora/JSON/workouts.json', 'w') as f:
    json.dump(workouts, f, indent=2)

print(f"Updated {updated_count} exercises with exercise_id")
if missing_exercises:
    print(f"Missing exercises: {set(missing_exercises)}")
else:
    print("All exercises successfully mapped!")
