FROM ubuntu:22.04
WORKDIR /app

RUN apt update && apt install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/prometheus/snmp_exporter/releases/download/v0.25.0/snmp_exporter-0.25.0.freebsd-amd64.tar.gz && \
    tar -xvf snmp_exporter-0.25.0.freebsd-amd64.tar.gz && \
    mv snmp_exporter-0.25.0.freebsd-amd64/snmp_exporter /app/snmp_exporter && \
    rm -rf snmp_exporter-0.25.0.freebsd-amd64 snmp_exporter-0.25.0.freebsd-amd64.tar.gz

ENTRYPOINT [ "/app/snmp_exporter" ]