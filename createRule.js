const AWS = require('aws-sdk');

var credentials = new AWS.SharedIniFileCredentials({ profile: 'my_profile' });
AWS.config.credentials = credentials;

const bridgeEvent = new AWS.EventBridge()

module.exports.createRule = async (event) => {

    const params = {
        Name: "DEMO_EVENT",
        RoleArn: "arn:aws:iam::737588548235:role/DemoScheduleEventRole",
        ScheduleExpression: "rate(1 minute)", //cron(1 * * * ? *)
        State: "ENABLED",
    }


    try {
        const response = await bridgeEvent.putRule(params).promise()
        console.log('response:', response)
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Rule created!',
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