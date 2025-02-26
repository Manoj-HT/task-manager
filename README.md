# TaskManager

Task manager is an web application
Features include:
1. Create, Edit, Read and Delete tasks 
2. PWA capabilities
3. System level notification with sound
4. Lazy loading for components
5. Contains example of @defer usage

To run the application, install angular, skip if already installed
```
npm i @angular/cli
```

setup the project
```
npm i
```

run project
```
ng s --o
```

optionally you can use the backend provided, required: bun, 
change directory to backend
```
bun index.ts
```

building the project
```
ng build --configuration production --output-hashing=none --named-chunks
```
