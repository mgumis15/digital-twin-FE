## Digital-Twin frontend

Digital-Twin frontend React with Typescript.

### Workflow and good practice

Never commit directly to `master` branch. Create a new branch and make a pull request to `master` after finishing work.

Make sure that the branch name is according to what you are doing and the functionality provided by the code.

Switching branches:

```shell
git fetch origin -p
git pull origin master
git checkout -b <your initials>_<short branch description>

e.x.
git checkout -b DW_form_validation
```

Commit names:

```shell
git commit -m "[FE - frontend, Setup - project setup] - <your commit message>"

e.x.
git commit -m "[FE] - add basic tailwind setup"
```
