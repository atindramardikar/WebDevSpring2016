/**
 * Created by Sanjanamanoj on 4/3/2016.
 */
module.exports = function(mongoose)
{

    // use mongoose to declare a user schema
    var EventSchema = mongoose.Schema
    ({
        title: String,
        address: String,
        description: String,
        name: String,
        userId: String,
        email: String,
        schedule:[{date:Date,times:[Date]}],
        hidden:String,
        oneOption:String,
        limit:String,
        everyone:String,
        invite: String,
        participate:Number,
        invitedEmails:[String]
    }, {collection: 'project.eventScheduler.event'});
    return EventSchema;
};