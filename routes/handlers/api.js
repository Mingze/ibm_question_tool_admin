var configuration = require("../../lib/configuration.js");
var questions = require("../../lib/questions.js");

exports.getProfile = function(req, content, cb) {
	configuration.getProfile(function(err, doc) {
		if (err) {
			console.error(err.stack);
			return cb(err);
		}
		cb(null, doc);
	});
};

exports.getConfiguration = function(req, content, cb) {
	configuration.getConfiguration(function(err, doc) {
		if (err) {
			console.error(err.stack);
			return cb(err);
		}
		cb(null, doc);
	});
};

exports.getQuestion = function(req, content, cb) {
	questions.getQuestion(req.params.id, function(err, doc) {
		if (err) {
			console.error(err.stack);
			return cb(err);
		}
		cb(null, doc);
	});
};

exports.saveQuestion = function(req, content, cb) {
	questions.saveQuestion(req.body.id, req.body.question, JSON.parse(req.body.profile_fields), function(err, doc) {
		if (err) {
			console.error(err.stack);
			return cb(err);
		}
		cb(null, doc);
	});
};

exports.getQuestions = function(req, content, cb) {
	questions.getQuestions(function(err, doc) {
		if (err) {
			console.error(err.stack);
			return cb(err);
		}
		cb(null, doc);
	});
};

exports.deleteQuestions = function(req, content, cb) {
	questions.deleteQuestions(req.body.questions, function(err, doc) {
		if (err) {
			console.error(err.stack);
			return cb(err);
		}
		cb(null, doc);
	});
};