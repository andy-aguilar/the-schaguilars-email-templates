var AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

var ddb = new AWS.DynamoDB();

const params = {
  ExpressionAttributeNames: {
    "#AL": "addressLabel",
    "#EA": "emailAddress",
    "#ID": "id",
  },
  ProjectionExpression: "#AL, #EA, #ID",
  TableName: "Rsvp-r3yc2rbtbnarxhyeptux54mu3e-prod",
};

ddb.scan(params, (err, data) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Success", data);
    const filteredData = data.Items.map((element) => {
      const emailAddress = element.emailAddress.S;
      const id = element.id.S;
      const addressLabel = element.addressLabel.S;

      const invitation = { emailAddress, id, addressLabel };
      return invitation;
    })
    .filter((invitation) => invitation.emailAddress)
    console.log(filteredData)
  }
});
