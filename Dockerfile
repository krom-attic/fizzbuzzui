FROM twalter/openshift-nginx:latest

ADD ./dist/fizzbuzzui /usr/share/nginx/html

EXPOSE 8081
