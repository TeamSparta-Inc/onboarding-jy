FROM node:17-alpine3.14
WORKDIR /opt/app

# 패키지 설치
COPY ["package.json", "yarn.lock", "./"]
RUN ["npm", "install"]

# ADD
ADD ["./", "./"]
# COPY [".","./"]
# ADD ["src/", "./src/"]
# ADD ["enc/", "./enc/"]

# # 불필요한 파일 제거 -> 파일을 제거?
# RUN ["/bin/sh", "-c", "find . ! -name node_modules -maxdepth 1 -mindepth 1 -exec rm -rf {} \\;"]

ENTRYPOINT ["node", "index.js"]
EXPOSE 9999/tcp