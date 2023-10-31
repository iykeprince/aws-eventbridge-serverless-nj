const AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({ profile: 'my_profile' });
AWS.config.credentials = credentials;

const bridgeEvent = new AWS.EventBridge()

module.exports.putTarget = async (event) => {
    console.log('event', event.body)

    const params = {
        Rule: "DEMO_EVENT",
        Targets: [
            {
                Arn: "arn:aws:lambda:us-east-1:737588548235:function:LogScheduledEvent",
                Id: Date.now().toString(),
            }
        ]
    }


    try {
        const response = await bridgeEvent.putTargets(params).promise()
        console.log('response:', response)
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Target added!',
                    input: event,
                },
                null,
                2
            ),
        };
    } catch (error) {
        console.log('Error:', error)
    }

}