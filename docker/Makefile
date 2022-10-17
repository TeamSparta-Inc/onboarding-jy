#!make
TAG                         := $$(git log -1 --pretty=format:%h)
ECR_URI                     := 497217256558.dkr.ecr.ap-northeast-2.amazonaws.com
BASENAME_SEVER              := santoryu-backend
BASENAME_PROXY              := santoryu-nginx
NAME_SERVER                 := ${BASENAME_SEVER}-$$env# santoryu-backend-local
NAME_PROXY                  := ${BASENAME_PROXY}-$$env# santoryu-nginx-local
ECR_ENDPOINT_SERVER         := ${ECR_URI}/${NAME_SERVER}
ECR_ENDPOINT_PROXY          := ${ECR_URI}/${NAME_PROXY}
LOCAL_IMG_COMMIT_SERVER     := ${NAME_SERVER}:${TAG}# santoryu-backend-local:123123
LOCAL_IMG_LATEST_SERVER     := ${NAME_SERVER}:latest# santoryu-backend-local:latest
LOCAL_IMG_COMMIT_PROXY      := ${NAME_PROXY}:${TAG}
LOCAL_IMG_LATEST_PROXY      := ${NAME_PROXY}:latest
ECR_IMG_COMMIT_SERVER       := ${ECR_ENDPOINT_SERVER}:${TAG}
ECR_IMG_LATEST_SERVER       := ${ECR_ENDPOINT_SERVER}:latest
ECR_IMG_COMMIT_PROXY        := ${ECR_ENDPOINT_PROXY}:${TAG}
ECR_IMG_LATEST_PROXY        := ${ECR_ENDPOINT_PROXY}:latest

build:
	@echo $$env;
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
	@if [[ $$build == "true" ]]; then\
		make build env=$$env;\
	fi
	@sh run.sh $$env


push:
	@aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 497217256558.dkr.ecr.ap-northeast-2.amazonaws.com
	@docker push ${ECR_IMG_COMMIT_SERVER}
	@docker push ${ECR_IMG_LATEST_SERVER}
	@docker push ${ECR_IMG_COMMIT_PROXY}
	@docker push ${ECR_IMG_LATEST_PROXY}

