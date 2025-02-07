FROM amazoncorretto:17

WORKDIR /app

# Atualiza os pacotes e instala tar e gzip
RUN yum update -y && \
    yum install -y tar gzip && \
    yum clean all

COPY . ./

RUN ./mvnw clean package -U

EXPOSE 8080

ENTRYPOINT ["./mvnw", "spring-boot:run"]