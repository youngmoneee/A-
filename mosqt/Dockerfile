FROM eclipse-mosquitto:latest

# Mosquitto config 파일 복사
COPY mosquitto.conf /mosquitto/config/mosquitto.conf

# PID 파일 생성 경로 설정
RUN mkdir /var/run/mosquitto \
    && chown mosquitto:mosquitto /var/run/mosquitto \
    && touch /var/run/mosquitto/mosquitto.pid \
    && chown mosquitto:mosquitto /var/run/mosquitto/mosquitto.pid

# 브로커가 사용할 포트 노출
EXPOSE 1883

# Mosquitto 실행
CMD ["/usr/sbin/mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]
