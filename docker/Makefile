#!make
TAG                         := $$(git log -1 --pretty=format:%h)
ECR_URI                     := 497217256558.dkr.ecr.ap-northeast-1.amazonaws.com
BASENAME_SEVER              := santoryu-backend
BASENAME_PROXY              := santoryu-nginx
NAME_SERVER                 := ${BASENAME_SEVER}-$$env-2
NAME_PROXY                  := ${BASENAME_PROXY}-$$env-2
ECR_ENDPOINT_SERVER         := ${ECR_URI}/${NAME_SERVER}
ECR_ENDPOINT_PROXY          := ${ECR_URI}/${NAME_PROXY}
LOCAL_IMG_COMMIT_SERVER     := ${NAME_SERVER}:${TAG}
LOCAL_IMG_LATEST_SERVER     := ${NAME_SERVER}:latest
LOCAL_IMG_COMMIT_PROXY      := ${NAME_PROXY}:${TAG}
LOCAL_IMG_LATEST_PROXY      := ${NAME_PROXY}:latest
ECR_IMG_COMMIT_SERVER       := ${ECR_ENDPOINT_SERVER}:${TAG}
ECR_IMG_LATEST_SERVER       := ${ECR_ENDPOINT_SERVER}:latest
ECR_IMG_COMMIT_PROXY        := ${ECR_ENDPOINT_PROXY}:${TAG}
ECR_IMG_LATEST_PROXY        := ${ECR_ENDPOINT_PROXY}:latest


m1localbuild:

	@docker build --platform linux/amd64 -f _proxy.Dockerfile --build-arg ENV=$$env -t ${LOCAL_IMG_COMMIT_PROXY} .;
	@docker build --platform linux/amd64 -f _server.Dockerfile --build-arg ENV=$$env -t ${LOCAL_IMG_COMMIT_SERVER} ../;
	@docker tag ${LOCAL_IMG_COMMIT_SERVER} ${LOCAL_IMG_LATEST_SERVER};
	@docker tag ${LOCAL_IMG_COMMIT_PROXY} ${LOCAL_IMG_LATEST_PROXY};
	@docker tag ${LOCAL_IMG_COMMIT_SERVER} ${ECR_IMG_COMMIT_SERVER};
	@docker tag ${LOCAL_IMG_COMMIT_SERVER} ${ECR_IMG_LATEST_SERVER};
	@docker tag ${LOCAL_IMG_COMMIT_PROXY} ${ECR_IMG_COMMIT_PROXY};
	@docker tag ${LOCAL_IMG_COMMIT_PROXY} ${ECR_IMG_LATEST_PROXY};

m1localpush:
	@aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 497217256558.dkr.ecr.ap-northeast-1.amazonaws.com
	@docker push ${ECR_IMG_COMMIT_SERVER}
	@docker push ${ECR_IMG_LATEST_SERVER}
	@docker push ${ECR_IMG_COMMIT_PROXY}
	@docker push ${ECR_IMG_LATEST_PROXY}






build:
	@docker build -f _proxy.Dockerfile --build-arg ENV=$$env -t ${LOCAL_IMG_COMMIT_PROXY} .;
	@docker build -f _server.Dockerfile --build-arg ENV=$$env -t ${LOCAL_IMG_COMMIT_SERVER} ../;
	@docker tag ${LOCAL_IMG_COMMIT_SERVER} ${LOCAL_IMG_LATEST_SERVER};
	@docker tag ${LOCAL_IMG_COMMIT_PROXY} ${LOCAL_IMG_LATEST_PROXY};

	@if [ $$env != "local" ]; then\
        docker tag ${LOCAL_IMG_COMMIT_SERVER} ${ECR_IMG_COMMIT_SERVER};\
        docker tag ${LOCAL_IMG_COMMIT_SERVER} ${ECR_IMG_LATEST_SERVER};\
        docker tag ${LOCAL_IMG_COMMIT_PROXY} ${ECR_IMG_COMMIT_PROXY};\
        docker tag ${LOCAL_IMG_COMMIT_PROXY} ${ECR_IMG_LATEST_PROXY};\
    fi

run:
	@echo $$env;
	@sh run.sh $$env
	@if [ $$env == 'prod' ]; then\
		docker run \
		-d \
		--name newrelic-infra \
		--network=host \
		--cap-add=SYS_PTRACE \
		--privileged \
		--pid=host \
		-v "/:/host:ro" \
		-v "/var/run/docker.sock:/var/run/docker.sock" \
		-e NRIA_LICENSE_KEY=02e1677f258d92aba6a83f1c199bb8e78db6NRAL \
		newrelic/infrastructure:latest; \
	fi


push:
	@aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 497217256558.dkr.ecr.ap-northeast-2.amazonaws.com
	@docker push ${ECR_IMG_COMMIT_SERVER}
	@docker push ${ECR_IMG_LATEST_SERVER}
	@docker push ${ECR_IMG_COMMIT_PROXY}
	@docker push ${ECR_IMG_LATEST_PROXY}

network:
	@sh create-network.sh

kill:
	@echo 'Killing container...'
	@docker-compose -f docker-compose-$$env.yaml -p port-backend-app down

delete:
	@docker rmi -f $$( docker images --format "{{.ID}} {{.Repository}} {{.Tag}}" | awk '{print $$1}')