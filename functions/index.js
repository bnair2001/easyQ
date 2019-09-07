const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.aggregateTickets = functions.firestore
  .document("Tickets/{ticketId}")
  .onCreate(async (snapshot, event) => {
    const tid = event.params.ticketId;

    const docRef = admin
      .firestore()
      .collection("Tickets")
      .doc(tid);
    let snap = await db.collection("Tickets").get();
    console.log(snap.size);
    return docRef.update({ id: snap.size });
  });


exports.findMax = functions.database.ref('/agents/{agentID}/workingOn')
    .onWrite((change, context) => {
      // Only edit data when it is first created.
      // if (change.before.exists()) {
      //   return null;
      // }
      // // Exit when the data is deleted.
      // if (!change.after.exists()) {
      //   return null;
      // }
      // Grab the current value of what was written to the Realtime Database.
      const original = change.after.val();
      console.log(original);
      // console.log('Uppercasing', context.params.pushId, original);
      // const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return change.after.ref.parent.parent.parent.child('max').set(original);
    });
