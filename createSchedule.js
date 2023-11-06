const { SchedulerClient, CreateScheduleCommand } = require("@aws-sdk/client-scheduler"); // CommonJS impo
const AWS = require("aws-sdk"); //
var credentials = new AWS.SharedIniFileCredentials({ profile: 'my_profile' });

const client = new SchedulerClient({ credentials });

module.exports.createSchedule = async (event) => {

    const input = {
        Name: "DEMO_SCHEDULER", // required
        ScheduleExpression: "rate(1 minute)", //cron(1 * * * ? *)
        Target: { // Target
            Arn: "arn:aws:lambda:us-east-1:737588548235:function:LogScheduledEvent", // required
            // RoleArn: "arn:aws:iam::737588548235:role/DemoScheduleEventRole", // required
            RoleArn: "arn:aws:iam::737588548235:role/service-role/Amazon_EventBridge_Scheduler_LAMBDA_1ad335a14a", // required

        },
        FlexibleTimeWindow: { // FlexibleTimeWindow
            Mode: "OFF", // required
        },
    }


    try {
        const command = new CreateScheduleCommand(input);
        const response = await client.send(command);
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