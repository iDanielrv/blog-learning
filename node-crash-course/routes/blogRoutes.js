const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/:id', (req, res) => {
    // este id no final da const abaixo tem q ser igual ao q ta dps dos : acima
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            /* pode chamar doq vc quiser: */
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
        });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = router;



/* router.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new Blog2',
        snippet: ' about my new blog',
        body: 'More about my new blog'
    });

})

router.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})


router.get('/single-blog', (req, res) => {
    Blog.findById('6445c36b37325cc290628bfc')
        .then((result) => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);
        });
}); */