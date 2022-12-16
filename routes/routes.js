const express = require("express");

// noteRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /note.
const noteRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the notes.
noteRoutes.route("/notes").get(function (req, res) {
  let db_connect = dbo.getDb("notesmaster");
  db_connect
    .collection("notes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single note by id
noteRoutes.route("/note/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("notes")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new note.
noteRoutes.route("/note/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  const date=new Date();
  console.log(date)
  let myobj = {
    title: req.body.title,
    content: req.body.content,
    created:date.toUTCString(),
    updated:date.toUTCString()
  };
  db_connect.collection("notes").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a note by id.
noteRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  const date=new Date();
  let newvalues = {
    $set: {
      title: req.body.title,
      content: req.body.content,
      created:req.body.created,
      updated:date.toUTCString()
    },
  };
  db_connect
    .collection("notes")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("note updated succesfully");
      response.json(res);
    });
});

// This section will help you delete a note
noteRoutes.route("/delete/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("notes").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("note deleted succesfully");
    response.json(obj);
  });
});

module.exports = noteRoutes;
