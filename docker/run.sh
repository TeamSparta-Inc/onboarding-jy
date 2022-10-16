docker-compose -f $PWD/docker-compose-$1.yaml -p santoryu-ecsproject down
docker-compose -f $PWD/docker-compose-$1.yaml -p santoryu-ecsproject up -d
docker logs -f santoryu-backend-app