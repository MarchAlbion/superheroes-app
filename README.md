Tech Stack
- React
- Typescript
- Tailwind
- Nodejs
- Express
- MongoDB
- Minio
- Multer
- Tailwind UI
- Docker
- React-Router

Instructions

1. Clone the repository
2. Run the following commands in the terminal
docker-compose up
 - This will start the mongodb container and the minio container
 - The minio container will be accessible at http://localhost:9000


    minio user name: minioadmin
    minio password: miniosecret
    
 - The mongodb container will be accessible at http://localhost:27017
 - The backend will be accessible at http://localhost:3010
 - The frontend will be accessible at http://localhost:3000
  After u need to cd into the backend directory and run the following command
  npm install
  npm run dev
  This will start the backend server
  Dont forget about frontend directory
  cd frontend
  npm install
  npm start
  This will start the frontend server



  P.S Ofcourse you need to install docker.