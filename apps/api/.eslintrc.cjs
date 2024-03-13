/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["custom"],
  "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
};

