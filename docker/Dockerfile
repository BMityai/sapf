FROM alpine:3.13

# Workdirectory
WORKDIR /var/www/app

RUN \
    # Install packages
    apk add --no-cache \
    nodejs-current npm tzdata nginx dcron bash git make && \
    # Update npm to the 7.x version (atm it is the latest version)
    npm install -g npm@^7 && \
    # Configure timezone
    cp /usr/share/zoneinfo/Asia/Almaty /etc/localtime && \
    echo "Asia/Almaty" > /etc/timezone

# Copy docker entrypoint
COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh

# Copy nginx config files
COPY ./docker/configs/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/configs/nginx/conf.d /etc/nginx/conf.d

# Permissions
RUN chmod +x /docker-entrypoint.sh && \
    mkdir -p /run/nginx && \
    chown -R nginx:nginx /var/www/app && \
    chown -R nginx:nginx /var/lib/nginx && \
    chmod -R 777 /var/lib/nginx/tmp && \
    chown -R nginx:nginx /var/run/nginx

# Copy code base
COPY . /var/www/app

EXPOSE 80

# Run entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
