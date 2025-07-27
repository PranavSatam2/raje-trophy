package com.trophy.Trophy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan({"com.trophy.Trophy"})
public class TrophyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrophyApplication.class, args);
		System.out.println("Application Start..");
	}

}
