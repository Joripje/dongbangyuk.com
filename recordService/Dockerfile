FROM maven:3.5.4-jdk-8-alpine as maven
COPY ./pom.xml ./pom.xml
COPY ./src ./src
RUN mvn dependency:go-offline -B
RUN mvn package

FROM openjdk:11
WORKDIR /app
COPY --from=maven target/kurento-hello-world-recording-6.18.0-exec.jar ./app.jar
CMD ["java", "-Dkms.url=ws://kms:8888/kurento", "-jar", "./app.jar"]
# CMD ["java", "-Dkms.url=wss://k8a305.p.ssafy.io:8888/kurento", "-jar", "./app.jar"]

