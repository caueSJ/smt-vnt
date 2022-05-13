<h1 align="center">Squad Management Tool</h1>
<p align="center">This tool guides users toward creating and configuring soccer teams, it also shows statistics about the current teams.</p>

## Requirements to run project
This project use **Vitejs** tool to prepare development environment, therefore require `node version equal or greater than 12.2.0`

## How to install and run the project
#### 1 - Clone the project:
```console
  git clone https://github.com/caueSJ/smt-vnt.git
```

#### 2- Enter inside the project folder:
```console
  cd smt-vnt/
```

#### 3 - Run npm install to download all dependencies:
```console
  npm install
```

#### 4 - To create / initiate the development environment, run the command:
```console
  npm run dev
```

#### 5 - To build project, run:
```console
  npm run build
  npm run preview
```


## Editing CSS
As the project uses SCSS to create and compile CSS, to edit the CSS it is necessary to access the styles folder `smt-vnt/src/styles` and run the follow command:
```console
  cd src/styles
  npx sass --watch sass:css
```
