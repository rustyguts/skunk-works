FROM ubuntu:latest

WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl unzip xz-utils && \
    rm -rf /var/lib/apt/lists/*

RUN curl -LO https://github.com/Kethsar/ytarchive/releases/download/v0.4.0/ytarchive_linux_amd64.zip && \
    unzip ytarchive_linux_amd64.zip && \
    rm ytarchive_linux_amd64.zip && \
    mv ytarchive /usr/local/bin/

RUN curl -LO https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-n7.0-latest-linux64-gpl-7.0.tar.xz && \
    tar -xvf ffmpeg-n7.0-latest-linux64-gpl-7.0.tar.xz && \
    rm ffmpeg-n7.0-latest-linux64-gpl-7.0.tar.xz && \
    mv ffmpeg-n7.0-latest-linux64-gpl-7.0/bin/ffmpeg /usr/local/bin/ && \
    rm -rf ffmpeg-n7.0-latest-linux64-gpl-7.0

COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]