"use strict";

const questions = [
  {
    type: "list",
    name: "type",
    message: "type",
    choices: [
      "feat     (new feature)",
      "fix      (bug fix)",
      "refactor (refactoring production code)",
      "style    (formatting, missing semi colons, etc; no code change)",
      "bump     (update version of repo or package)",
      "docs     (changes to documentation)",
      "test     (adding or refactoring tests; no production code change)",
      "chore    (updating grunt tasks etc; no production code change)",
    ],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "scope",
    message: "scope (optional)",
    validate: function (text) {
      if (text.length > 100) {
        return "test too long";
      }

      return true;
    },
  },
  {
    type: "list",
    name: "semver",
    message: "Semver",
    choices: [
      "major    (when you make incompatible API changes)",
      "minor    (when you add functionality in a backwards-compatible manner)",
      "patch    (when you make backwards-compatible bug fixes)",
    ],
  },
  {
    type: "input",
    name: "subject",
    message: "commit message (72 chars max.)",
    validate: function (text) {
      if (text.length > 72) {
        const over = text.length - 72;
        return `Over by ${over} characters. :(`;
      }

      return true;
    },
  },
  {
    type: "input",
    name: "ref",
    message: "Jira ticket number (ex, LOG-1234)",
    validate: function (text) {
      if (!text) {
        return "Ref is required, if you don't have one please enter n/a";
      }

      return true;
    },
  },
  {
    type: "confirm",
    name: "addSummary",
    message: "Would you like to add a summary?",
  },
  {
    type: "editor",
    name: "summary",
    message: "Summary",
    when: function (answers) {
      return answers.addSummary;
    },
  },
  {
    type: "editor",
    name: "testplan",
    message: "Test plan",
    validate: function (text) {
      if (!text) {
        return "Test plan is required";
      }

      return true;
    },
  },
];

module.exports = {
  prompter: (cz, commit) => {
    cz.prompt(questions).then((answers) => {
      commit(`${answers.type.split(" ")[0]}${
answers.scope ? `(${answers.scope})` : ""
} ${answers.subject}

Summary: ${answers.summary ? answers.summary : ''}

Test Plan:
${answers.testplan}

Ref: ${answers.ref}

Semver: ${answers.semver.split(" ")[0]}`);
    });
  }
}
