FROM node:17-alpine3.14
WORKDIR /opt/app

# 패키지 설치
COPY ["package*.json", "./"]
RUN ["npm", "install"]

COPY ["src/", "./src/"]

ARG ENV

# # 불필요한 파일 제거
# RUN ["/bin/sh", "-c", "find . ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]

#ENTRYPOINT ["node", "./src/index.js"]

# CMD, ENTRYPOINT는 runtime execution이라 args나 env 변수 사용 못함
ENTRYPOINT ["npm", "start"]
EXPOSE 8000/tcp