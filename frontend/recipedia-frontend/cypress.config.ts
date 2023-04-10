import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "42rqp7",
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  video: true
});
