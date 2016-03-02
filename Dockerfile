FROM alpine:3.2
RUN apk add --update nginx \
  && rm -rf /var/cache/apk/* \
  && mkdir -p /tmp/nginx/client-body \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

COPY nginx.conf /etc/nginx/nginx.conf
COPY app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]