
module.exports = function(mongoose)
{

    // use mongoose to declare a user schema
    var EventSchema = mongoose.Schema
    ({
        adminId: String,
        title: String,
        address: String,
        description: String,
        name: String,
        userId: String,
        email: String,
        schedule:[{date:Date,times:[{time:String, participants:[String]}]}],
        hidden:Boolean,
        limit:Boolean,
        limitNumber:Number,
        everyone:String,
        invite: String,
        participate:Number,
        invitedEmails:[String],
        closePoll:Boolean,
        nonParticipants:[String]
    }, {collection: 'project.eventScheduler.event'});
    return EventSchema;
};