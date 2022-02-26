const assert = require("assert");
const cloud9 = require("@aws-sdk/client-cloud9");
const { CreateEnvironmentEC2Command } = require("@aws-sdk/client-cloud9");

assert.ok(process.env.AWS_ACCESS_KEY_ID);
assert.ok(process.env.AWS_SECRET_ACCESS_KEY);
assert.ok(process.env.AWS_SESSION_TOKEN);

const client = new cloud9.Cloud9Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }
});

client
  .send(
    new CreateEnvironmentEC2Command({
      name: "my-name-cloud9",
      instanceType: "t2.micro",
      automaticStopTimeMinutes: 30,
      connectionType: "CONNECT_SSM"
    })
  )
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
