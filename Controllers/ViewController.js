
exports.getOverview = (req, res) => {
    res.status(200).render('overview', {
        title: 'All Tours'
    });
}

exports.getTours = (req, res) => {
    res.status(200).render('tour', {
        title: 'The Himalyan'
    });
}
