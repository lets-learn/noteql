module.exports = {
	handleError(err,res) {
		res.status(400)
			.send({
				error: err
			});
		return;
	}
}