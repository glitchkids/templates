export default {
  input: {
    files: [
      {
        name: "Project/Index",
        path: "./src/index.ts",
      },
    ],
    folders: [
      {
        name: "Source/Hello",
        path: "./src",
        ignore: ["**/index.ts"],
      },
    ],
  },
};
