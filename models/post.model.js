//imports
const helper = require("./../helpers/helpers");

//variables
const filename = "E:\3rd SemesterWeb Application Development - COMP 229Week 1dataposts.json";

//Array
let posts = require("./../data/posts.json");

//READ
const getPosts = () => {
  //ALL POSTS
  //array is null
  //if else
  return new Promise((resolve, reject) => {
    //BL
    if (posts.length === 0) {
      //Reject
      reject({
        messsge: "sorry ,no posts available to display!!",
        status: 202,
      });
    } else {
      //resolved
      resolve(posts);
    }
  });
};

const getPost = (id) => {
  //one perticular post
  //index of the element by traversing through the array
  //SIMILAR CODE LOGIC array.find(r.id == id)
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(posts, id)
      .then((post) => resolve(post))
      .catch((err) => reject(err));
  });
};

const insertPost = (newPost) => {
  //Insert
  //array.push()-> id should be unique -> getNewId
  return new Promise((res, rej) => {
    //ID
    const id = { id: helper.getNewId(posts) };

    //DATES
    const date = {
      createdAt: helper.newDate(),
      updatedAt: helper.newDate(),
    };
    newPost = { ...id, ...date, ...newPost };

    posts.push(newPost);
    helper.writeJSONFile(filename, posts);
    res(newPost, 200);
  });
};
const updatePost = (id, newPost) => {
  //update
  //index of the element
  //replace element
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(posts, id)
      .then((post) => {
        const index = posts.findIndex((p) => p.id == post.id);
        id = { id: post.id };
        //DATES
        const date = {
          createdAt: post.createdAt,
          updatedAt: helper.newDate(),
        };
        posts[index] = { ...id, ...date, ...newPost };

        helper.writeJSONFile(filename, posts);

        resolve(posts[index]);
      })
      .catch((err) => reject(err));
  });
};
const deletePost = (id) => {
  //delete
  //index of the element
  //delete element
  return new Promise((resolve, reject) => {
    helper
      .mustBeInArray(posts, id)
      .then((post) => {
        posts = posts.filter((p) => p.id !== post.id);
        helper.writeJSONFile(filename, posts);
        resolve();
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  getPost,
  getPosts,
  insertPost,
  updatePost,
  deletePost,
};
