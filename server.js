const express = require("express");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
var admin = require("firebase-admin");

// Database

var serviceAccount = require("./servicAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://easyq-736b7.firebaseio.com"
});
const db = admin.firestore();

/////
// Realtime database
///
//
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const config = {
  apiKey: "AIzaSyBB4Y_uqwhOkP_uwcZeBzeceShwotav4FQ",
  authDomain: "easyq-736b7.firebaseapp.com",
  databaseURL: "https://easyq-736b7.firebaseio.com",
  projectId: "easyq-736b7",
  storageBucket: "easyq-736b7.appspot.com",
  messagingSenderId: "247413441634",
  appId: "1:247413441634:web:943351990684e882"
};
firebase.initializeApp(config);

var rdb = firebase.database();

///////////////////////////////////////////////
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/makeTicket", async (req, res) => {
  const ticketData = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    mobile: req.body.mobile,
    purpose: req.body.purpose,
    isWaiting: true,
    isProcessing: false,
    isFinished: false,
    isCancelled: false
  };
  let response;
  try {
    response = await db.collection("Tickets").add(ticketData);
  } catch (err) {
    console.log(err.message);
  }

  console.log(req.body.first);
  console.log(response.id);
  res.send({ message: response.id });
});

app.post("/makeAgent", (req, res) => {
  rdb.ref("agents/" + req.body.id).set({
    workingOn: "0"
  });
});

app.post("/getTicket", async (req, res) => {
  let Ref = db.collection("Tickets");
  let id;
  let data;
  try {
    let query = await Ref.orderBy("id")
      .where("isWaiting", "==", true)
      .where("isCancelled", "==", false)
      .limit(1)
      .get();

    if (query.empty) {
      console.log("No matching documents.");
    }

    query.forEach(doc => {
      id = doc.id;
      data = doc.data();
      console.log(doc.id, "=>", doc.data());
    });
  } catch (err) {
    console.log("Error getting documents", err);
  }

  const update = {
    isProcessing: true,
    isWaiting: false
  };

  let newobj;
  //realtime db update
  if (id) {
    try {
      let resy = await db
        .collection("Tickets")
        .doc(id)
        .update(update);
    } catch (err) {
      console.log(err.message);
    }
    rdb.ref("agents/" + req.body.agentId).set({
      workingOn: data["id"]
    });
    newobj = {
      ...data,
      tid: id
    };
  } else {
    newobj = { empty: true };
  }

  return res.json(newobj);
});

app.post("/makeCompleteUpdate", async (req, res) => {
  const newUpdate = {
    isProcessing: false,
    isFinished: true,
    rating: req.body.rating,
    mood: req.body.mood
  };
  try {
    console.log(req.body.id);
    await db
      .collection("Tickets")
      .doc(req.body.id)
      .update(newUpdate);
  } catch (err) {
    console.log(err.message);
  }
  res.send("success");
});

app.post("/getTicketById", async (req, res) => {
  let results;

  try {
    let qu = db.collection("Tickets").doc(req.body.id);
    results = await qu.get();
  } catch (err) {
    console.log(err.message);
  }
  console.log(results.exists);
  res.json(results.data());
});

app.get("/verify", (req, res) => {
  return res.json({ verified: true });
});

app.post("/cancelTicket", async (req, res) => {
  let docID = req.body.id;
  const cancelUpdate = {
    isCancelled: true
  };
  try {
    await db
      .collection("Tickets")
      .doc(docID)
      .update(cancelUpdate);
  } catch (error) {
    console.log(error.message);
  }
  res.json({ message: "Success" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
