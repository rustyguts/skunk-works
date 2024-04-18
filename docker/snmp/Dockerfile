FROM ubuntu:22.04
WORKDIR /app

RUN apt update && apt install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/prometheus/snmp_exporter/releases/download/v0.25.0/snmp_exporter-0.25.0.linux-amd64.tar.gz && \
    tar -xvf snmp_exporter-0.25.0.linux-amd64.tar.gz  && \
    mv snmp_exporter-0.25.0.linux-amd64/* /app/ && \
    rm -rf snmp_exporter-0.25.0.linux-amd64 snmp_exporter-0.25.0.linux-amd64.tar.gz 

CMD [ "/app/snmp_exporter" ]