FROM alpine:latest

RUN apk add --no-cache wget ffmpeg unzip

RUN wget https://github.com/Kethsar/ytarchive/releases/download/v0.4.0/ytarchive_linux_amd64.zip && \
    unzip ytarchive_linux_amd64.zip && \
    rm ytarchive_linux_amd64.zip && \
    mv ytarchive /usr/local/bin/

ENTRYPOINT ["ytarchive"]