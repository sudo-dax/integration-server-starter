const express = require("express")
const router = express.Router()
const {
	getPosts,
	getPost,
	makePost,
	removePost,
	changePost,
	getComments,
	makeComment,
	removeComment,
	verifyOwner,
	verifyCommentOwner,
	validUser
} = require("../controllers/posts_controller")
const { userAuthenticated } = require("../utils/common_utilities")

// READ
// GET on '/posts'
// Returns all posts
router.get("/", getPosts)

// READ
// GET on '/posts/:id'
// Returns post with given id
router.get("/:id", getPost)

// For post, delete, put, post comment -require authenticated, valid user
router.use(userAuthenticated, validUser)
// CREATE
// POST on '/posts'
// Creates a new post
router.post("/", makePost)

// READ
// GET on '/posts/comments/:postId'
// Returns all of the comments for a post
// For now, requiring valid authenticated login to do this
router.get("/comments/:postId", getComments)

// CREATE
// POST on '/posts/comments/:postId'
// Adds a comment to a post with postId
router.post("/comments/:postId", makeComment)

// DELETE
// DELETE on '/posts/comments/:id'
// Deletes a comment with id
router.delete("/:id", verifyOwner, removePost)

// DELETE
// DELETE on '/posts/:id'
// Deletes a post with id
router.delete("/comments/:id", verifyCommentOwner, removeComment)

// UPDATE
// PUT on 'posts/:id'
// Updates a post with id
router.put("/:id", verifyOwner, changePost)

module.exports = router
