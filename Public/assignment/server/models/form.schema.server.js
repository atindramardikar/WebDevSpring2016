module.exports = function(mongoose) {

    var FieldSchema=require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: Date,
        updated: Date
        // collection property sets
        // collection name to 'form'
    }, {collection: 'form'});
    return FormSchema;
};