const Blog = require("../models/blogModel");
const User = require("../models/userModel");

export const getBlog = (req, res) => {
    Blog.find(function (err, blogs) {
      res.json(blogs);
    });
};

export const createBlog = (req, res) => {
    let data = new Blog(req.body.blog);
    data
      .save()
      .then((data) => {
        Blog.find(function (err, blogs) {
          res.json(blogs);
        });
      })
      .catch(function (err) {
        res.status(422).send("Blog add failed");
      });
};

export const deleteBlog = (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.json('success');
        } else {
            console.log(err);
        }
    });
}

export const createComment = async (req, res) => {
    let commentData = req.body.blog;
    try {
        let userData = await User.findOne({email: commentData.email, name: commentData.name})
        if(userData) {
            let newComment = {user_id: userData.id, content: commentData.message}
            let findBlog = await Blog.findOne({
                _id: commentData.blog_id
            })
            if(findBlog.comment.length === 0 || !findBlog.comment.find(element => element.user_id === userData.id)) 
            {
                let updateComment = {...newComment, comment_count: Math.ceil(findBlog.comment_count)+1}
                let result = await Blog.update({
                    _id: commentData.blog_id},{$push: {
                        comment: newComment
                },
                comment_count: Math.ceil(findBlog.comment_count)+1
            })

                let rst = await Blog.findOne({
                    _id: commentData.blog_id
                })
                return res.json(rst)
            }
            return res.json('Comment has already posted!')
        }
        return res.json("false")
    } catch(err) {
        throw err
    }
};

export const updateBlog = async (req, res) => {
    let rst = await Blog.update(
        { _id: req.body.blog._id },
        { $set: { title : req.body.blog.title,
            description : req.body.blog.description,
            category : req.body.blog.category,
            img : req.body.blog.img,
            date : req.body.blog.date,
        } }
    );
    let userData = await Blog.findOne({id: req.body.blog._id});
    return res.json(userData);
    
}