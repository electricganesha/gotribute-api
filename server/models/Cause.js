var mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});

var ratingSchema = new mongoose.Schema({
    transparency: [{
        type: Number
    }],
    financial: [{
        type: Number
    }],
    social: [{
        type: Number
    }]
});

var effortLocationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    address: String,
    title: String
});

var financialStatementSchema = new mongoose.Schema({
    administrativeExpenses: Number,
    fundraisingExpenses: Number,
    fundraisingEfficiency: Number,
    primaryRevenueGrowth: Number,
    programExpensesGrowth:Number,
    workingCapitalRatio:Number,
    totalRevenue: Number,
    ceoCompensation:Number
});

var CauseSchema = new mongoose.Schema({
    charity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: '{PATH} is required!',
    },
    title: {
        type: String,
        required: '{PATH} is required!',
    },
    created_at:{ type: Date, default: Date.now },
    pictures: [String],
    supporters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: '{PATH} is required!',
    }],
    keywords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keyword',
        required: '{PATH} is required!',
    }],
    donations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: '{PATH} is required!',
    }],
    news: [newsSchema],
    ratings: [ratingSchema],
    generalInfo: String,
    effortLocation:[effortLocationSchema],
    financialStatement:[financialStatementSchema]
});

module.exports = mongoose.model('Cause', CauseSchema);