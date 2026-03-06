const ignore = ["node_modules", "**/.env"];

export default {
  input: {
    files: [],
    folders: [
      {
        name: "Modules/Node",
        path: "./templates/node-package",
        ignore,
      },
    ],
  },
};
