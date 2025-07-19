FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apt-get update && apt-get install -y maven

# Nettoyage du cache Maven
RUN mvn dependency:purge-local-repository -DactTransitively=false -DreResolve=false

# Build the application
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/epharmacien-backend-1.0.0.jar"] 