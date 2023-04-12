const User = require("../models/userModel");

export const signup = (req, res) => {
    let data = new User(req.body.sendData);
    data
      .save()
      .then((data) => {
        User.find(function (err, users) {
          res.json(users);
        });
        console.log(data)
      })
      .catch(function (err) {
        res.status(422).send("User add failed");
      });
};

export const signin = async (req, res) => {
    let data = new User(req.body.user);
    User.findOne({email: data.email, password: data.password})
    .then((rst)=>{
        console.log("Result :",rst);
        res.json(rst);
    })
    .catch((err)=>{
        console.log(err);
    });
};

export const getAllUser = (req, res) => {
    User.find({"rollno":{$lte : 1}}, function (err, users) {
      res.json(users);
    });
};

export const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            User.find(function (err, users) {
                res.json(users);
            });
        } else {
            console.log(err);
        }
    });
}

export const updateUser =async (req, res) => {
    let rst = await User.update(
        { _id: req.body.user._id },
        { $set: { name : req.body.user.name,
            email : req.body.user.email,
            password : req.body.user.password,
            rollno : req.body.user.rollno
        } }
    );
    User.find({"rollno":{$lte : 1}}, function (err, users) {
        res.json(users);
    });
}