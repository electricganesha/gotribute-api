// KEYWORDS API

var Keywords = require('../../server/models/Keyword');

module.exports = function (apiRouter) {

    // get all keywords
    apiRouter.get('/keywords', function (req, res) {
        Keywords.find().sort('-keyword')
            .exec(function (err, keywords) {
                if (err)
                    res.send(err);
                else
                    res.json(keywords);
            });
    });

    // add a keyword
    apiRouter.post('/keywords', function (req, res) {

        var keyword = new Keywords();
        keyword.keyword = req.body.keyword;

        keyword.save(function (err, keyword) {
            if (err) res.send(err);
            console.log(err);
            res.json(keyword);
        });
    });

    // get a single keyword
    apiRouter.get('/keywords/:id', function (req, res) {
        Keywords.findById(req.params.id, function (err, keyword) {
            if (err) res.send(err);
            res.json(keyword);
        }).populate('keywords');
    });

    // update a keyword
    apiRouter.put('/keywords/:id', function (req, res) {
        Keywords.findById(req.params.id, function (err, keyword) {

            if (err) res.send(err);

            keyword.keyword = req.body.keyword;

            keyword.save(function (err) {
                console.log(err);
                if (err) res.send(err);

                res.json({
                    message: 'keyword updated with success!'
                });
            });
        });
    });

    // delete a keyword
    apiRouter.delete('/keywords/:id', function (req, res) {
        Keywords.remove({
            _id: req.params.id
        }, function (err, post) {
            if (err) res.send(err);

            res.json({
                message: 'keyword deleted with success!'
            });
        });
    });

};