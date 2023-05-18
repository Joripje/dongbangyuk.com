FROM adoptopenjdk/openjdk11 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJAR

FROM adoptopenjdk/openjdk11
VOLUME /tmp
COPY --from=builder build/libs/KurentService-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8070
ENTRYPOINT ["java", "-Dkms.url=ws://kms:8888/kurento", "-jar", "./app.jar"]


# COPY --from=maven target/KurentService-6.18.0-exec.jar ./app.jar
# CMD ["java", "-Dkms.url=ws://kms:8888/kurento", "-jar", "./app.jar"]


# CMD ["java", "-Dkms.url=wss://k8a305.p.ssafy.io/kurento", "-jar", "./app.jar"]
# CMD ["java", "-Dkms.url=wss://k8a305.p.ssafy.io:8888/kurento", "-jar", "./app.jar"]