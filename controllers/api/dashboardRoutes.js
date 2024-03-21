const router = require("express").Router();
const { BlogPost, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to render the user's dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    // Fetch the user's blog posts along with other necessary data
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: BlogPost }],
    });

    // Serialize the user's data to send to the handlebars template
    const user = userData.get({ plain: true });

    res.render("dashboard", { user });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the edit blog post page
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Fetch the selected blog post data
    const blogPostData = await BlogPost.findByPk(req.params.id);

    if (!blogPostData) {
      res.status(404).json({ message: "Blog post not found" });
      return;
    }

    // Serialize the blog post data to send to the handlebars template
    const blogPost = blogPostData.get({ plain: true });

    res.render("edit-post", { blogPost });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Additional routes for updating and deleting blog posts could be added here

module.exports = router;
