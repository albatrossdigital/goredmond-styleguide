## Installation

#### Basic (repo already setup)
Just clone the repo, npm install and run grunt:
```
git clone git@github.com:albatrossdigital/<repoName>.git
cd pls
npm install && bower install 
grunt
```

#### Pushing changes
```
git status
git commit -m "msg" filenames
git push
```

#### Typekit urls
```
albatrossdigital.github.io,127.0.0.1:9000,*.albatrossdemos.com
```


#### Advanced (setting up repo)
Create repo in github
1. Click + up in the top-right
2. Change account owner for repo to Albatross Digital
3. Create a <repoName> for your styleguide (`goredmond-styleguide`). 
4. Leave privacy on repo Public
```
git clone git@github.com:albatrossdigital/bootstrap-style-guide.git
mv bootstrap-style-guide <repoName>
cd <repoName>
git remote set-url origin git@github.com:albatrossdigital/<repoName>.git
git push origin gh-pages
```


## Using

#### Installing custom fonts
Add this to a sass file. You can use https://fontie.flowyapps.com/home or http://www.flaticon.com/font-face to create all of the varients if necessary.
```
@font-face
  font-family: '<fontname>'
  src: url('../fonts/<fontname>.eot')
  src: url('../fonts/<fontname>.eot?#iefix') format('embedded-opentype'), url('../fonts/<fontname>.woff') format('woff'), url('../fonts/<fontname>.ttf') format('truetype'), url('../fonts/<fontname>.svg') format('svg')
  font-weight: normal
  font-style: normal
```
