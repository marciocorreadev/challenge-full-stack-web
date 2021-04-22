npm run build

sleep 2

npm run start-pm2

sleep 2

curl http://localhost:3000/ping

curl http://localhost:3000/students

pm2 kill
