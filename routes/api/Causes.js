// CAUSES API

var Causes = require('../../server/models/Cause');

module.exports = function (apiRouter) {

    // get all causes
    apiRouter.get('/causes', function (req, res) {
        Causes.find().populate('keywords').sort('-created_at')
            .exec(function (err, causes) {
                if (err)
                    res.send(err);
                else
                    res.json(causes);
            });
    });

    // get all causes by keyword
    apiRouter.get('/causesbykeyword/:id', function (req, res) {
        Causes.find({
                keyword: req.params.id
            }).populate('keywords').sort('-created_at')
            .exec(function (err, causes) {
                if (err)
                    res.send(err);
                else
                    res.json(causes);
            });
    });

    // add a cause
    apiRouter.post('/causes', function (req, res) {

        var cause = new Causes();
        cause.charity = req.body.charity;
        cause.title = req.body.title;
        cause.created_at = req.body.created_at;
        cause.pictures = req.body.pictures;
        cause.supporters = req.body.supporters;
        cause.keywords = req.body.keywords;
        cause.donations = req.body.donations;
        cause.news = req.body.news;
        cause.ratings = req.body.ratings;
        cause.generalInfo = req.body.generalInfo;
        cause.effortLocation = req.body.effortLocation;
        cause.financialStatement = req.body.financialStatement;

        cause.save(function (err, cause) {
            if (err) res.send(err);
            console.log(err);
            res.json(cause);
        });
    });

    // get a single cause
    apiRouter.get('/causes/:id', function (req, res) {
        Causes.findById(req.params.id, function (err, cause) {
            if (err) res.send(err);
            res.json(cause);
        }).populate('keywords');
    });

    // update a cause
    apiRouter.put('/causes/:id', function (req, res) {
        Causes.findById(req.params.id, function (err, cause) {

            if (err) res.send(err);

            cause.charity = req.body.charity;
            cause.title = req.body.title;
            cause.created_at = req.body.created_at;
            cause.pictures = req.body.pictures;
            cause.supporters = req.body.supporters;
            cause.keywords = req.body.keywords;
            cause.donations = req.body.donations;
            cause.news = req.body.news;
            cause.ratings = req.body.ratings;
            cause.generalInfo = req.body.generalInfo;
            cause.effortLocation = req.body.effortLocation;
            cause.financialStatement = req.body.financialStatement;

            cause.save(function (err) {
                console.log(err);
                if (err) res.send(err);

                res.json({
                    message: 'Cause updated with success!'
                });
            });
        });
    });

    // delete a cause
    apiRouter.delete('/causes/:id', function (req, res) {
        Causes.remove({
            _id: req.params.id
        }, function (err, post) {
            if (err) res.send(err);

            res.json({
                message: 'Cause deleted with success!'
            });
        });
    });

};