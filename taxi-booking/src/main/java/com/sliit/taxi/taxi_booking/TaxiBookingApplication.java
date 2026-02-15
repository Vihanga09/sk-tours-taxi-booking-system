package com.sliit.taxi.taxi_booking;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TaxiBookingApplication {

    public static void main(String[] args) {
        
        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            for (DotenvEntry entry : dotenv.entries()) {
                System.setProperty(entry.getKey(), entry.getValue());
            }
        } catch (Exception e) {
            System.out.println("Note: .env file loading skipped.");
        }

        SpringApplication.run(TaxiBookingApplication.class, args);
    }
}