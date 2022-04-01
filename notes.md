cmd to start mongo db
```
sudo ~/Library/mongodb-macos-x86_64-5.0.6/bin/mongod --dbpath ~/data/db --port 27017 
```

cmd to start and keep running in bg 
```
sudo ~/Library/mongodb-macos-x86_64-5.0.6/bin/mongod --dbpath ~/data/db --port 27017 --fork --logpath mongolog.log
```