const publicFolder =
  process.env.REACT_APP_PUBLIC_FOLDER ||
  "https://srishty-social-backend.onrender.com/public/images/";

export const PostsData = [
  {
    img: publicFolder + "postPic1.jpg",
    name: "Ritika",
    desc: "Happy New Year all friends 🤩🎉🎉! #2023",
    likes: 5000,
    liked: true,
  },
  {
    img: publicFolder + "postPic2.jpg",
    name: "Maryam",
    desc: "1st Day office 🤩",
    likes: 4000,
    liked: false,
  },
  {
    img: publicFolder + "postPic3.jpg",
    name: "Raj",
    desc: "Happy Birthday 🎂🎊🎉",
    likes: 1000,
    liked: false,
  },
];