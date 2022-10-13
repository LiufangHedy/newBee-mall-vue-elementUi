module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 7"],
    },
    "postcss-pxtorem": {
      rootValue: 54, // 75表示750设计稿，54表示540设计稿
      propList: ["*"],
    },
  },
};
