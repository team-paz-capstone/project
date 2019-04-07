Spring Boot Hello World
===

Playground for learning and experimenting with Spring Boot.

Getting Started
---

Make sure Java is installed on your system:
```bash
$ java -version
```

I am using JDK v. 8, which can be downloaded here: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

It's a good idea if we standardize on a given version of Java, but for this project, it probably won't matter (as long as
you're using at least version 8).

```bash
Matthews-MBP:spring-hello-world matthewanderson$ java -version
java version "1.8.0_181"
Java(TM) SE Runtime Environment (build 1.8.0_181-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.181-b13, mixed mode)
Matthews-MBP:spring-hello-world matthewanderson$
```


You will also need to install Maven (Java's dependency management system and build tool - similar to NPM for Node or pip for Python.)
https://maven.apache.org/install.html

Verify Maven has installed correctly:
```bash
$ mvn -version
```

Running the application
---

After cloning the repository, execute the following command from the project root:

```bash
$ mvn spring-boot:run
```

The application should spin up - keep an eye on the terminal for any errors. I'm happy to help troubleshoot.

By default, the application will be running on **localhost:8080**.


API Documentation
---
I've using the SpringFox library to automatically generate Swagger2 documentation for the API. Documentation can
be accessed by going to:

```
http://localhost:8080/swagger-ui.html
```


Troubleshooting
===

* **java.lang.ExceptionInInitializerError** on application startup ```$mvn spring-boot:run```  
**Solution**: [The Lombok library doesn't play nice with JDK version 10](https://github.com/rzwitserloot/lombok/issues/1572).  
Either use JDK version 8, or we can remove this library from the project.  
JDK version 8 can be downloaded [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) Make sure  
```$java``` points to this new installation by either modifying your ```$PATH```, or by setting the environment  
variable ```$JAVA_HOME=/path/to/jdk8```