FROM nginx:1.21.6

# 환경설정
ARG ENV
ADD ["proxy/nginx-${ENV}.conf", "/etc/nginx/nginx.conf"]