const Workout = require('../models/Workout');

const { errorHandler } = require('../auth');

module.exports.addWorkout = (req, res) => {
	let newWorkout = new Workout({
		name: req.body.name,
		duration: req.body.duration,
		userId: req.body.userId
	});

	return newWorkout.save()
	.then(result => res.status(201).send(result))
	.catch(error => errorHandler(error, req, res));
};

module.exports.getMyWorkouts = (req, res) => {
	return Workout.find({})
	.then(result => {
		if(result.length > 0){
			return res.status(200).send({ workouts: result });
		} else {
			return res.status(404).send({ message: "No workouts found"});
		}
	})
	.catch(error => errorHandler(error, req, res));
};