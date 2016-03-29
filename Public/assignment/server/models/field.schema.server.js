module.exports = function(mongoose) {
    // use mongoose to declare a field schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label: String, value: String}]
        // collection property sets
        // collection name to 'field'
    }, {collection: 'field'});
    return FieldSchema;
};