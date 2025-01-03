# Use uma imagem base do OpenJDK
FROM openjdk:17-jdk-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo JAR gerado pelo Maven para o container
COPY target/demo-V1.0.jar app.jar

# Exponha a porta que o Spring Boot vai rodar
EXPOSE 8080

# Comando para rodar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]
