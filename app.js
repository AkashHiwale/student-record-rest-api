const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/studentDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const studentSchema = {
  name: String,
  age: Number,
  std: Number
};

const Student = mongoose.model("Student", studentSchema);

app.route("/students")
  .get(function(req, res) {
    Student.find(function(err, foundRecord) {
      if (!err) {
        res.send(foundRecord);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {

    const newRecord = new Student({
      name: req.body.name,
      age: req.body.age,
      std: req.body.std

    });
    newRecord.save(function(err) {
      if (!err) {
        res.send("Successfully saved new record..");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Student.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all students record.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
