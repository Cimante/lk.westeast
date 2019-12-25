// POST для выхода из приложения. Удаляем сессию

const logout = (req, res) => {
	if (req.session) {
		req.session.destroy(() => {
			res.json({message: 'Сессия была убита'})
		});
	} else {
		res.redirect('/')
	};
};

module.exports = logout;

/*
	delete req.session.user;
	res.redirect('/');
*/