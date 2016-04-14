/**
 * Created by Sanjanamanoj on 4/3/2016.
 */
module.exports = function(mongoose)
{
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema
    ({
        email: String,
        password: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        name: String,
        language: String,
        dob: Date,
        gender: String,
        country: String
    }, {collection: 'project.eventScheduler.user'});
    return UserSchema;
};