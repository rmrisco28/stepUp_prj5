package com.example.backend.batch.student.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Scanner;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class BatchController implements CommandLineRunner {

    private final JobLauncher jobLauncher;
    private final Job studentImportJob;

    @Override
    public void run(String... args) throws Exception {

        boolean stu_batch_yn = true;

        if (stu_batch_yn) {
            log.info("=== Backend Application Started ===");
            log.info("Available commands:");
            log.info("  'batch' - Run student import batch");
            log.info("  'exit' - Shutdown application");
            log.info("=====================================");

            Scanner scanner = new Scanner(System.in);

            while (true) {
                System.out.print("Enter command > ");
                String command = scanner.nextLine().trim().toLowerCase();

                switch (command) {
                    case "batch":
                        runStudentImportBatch();
                        break;

                    case "exit":
                        log.info("Shutting down application...");
                        System.exit(0);
                        break;

                    case "help":
                        printHelp();
                        break;

                    default:
                        log.warn("Unknown command: '{}'. Type 'help' for available commands.", command);
                        break;
                }
            }
        }
    }

    private void runStudentImportBatch() {
        try {
            log.info("Starting Student Import Batch Job...");

            JobParameters jobParameters = new JobParametersBuilder()
                    .addLong("startTime", System.currentTimeMillis())
                    // 중복 batch 인식 방지를 위해 UUID 추가 : 같은 csv 파일이라도 실행될 때마다 새로운 batch로 인식하게 함.
                    .addString("uniqueId", UUID.randomUUID().toString())
                    .toJobParameters();

            var jobExecution = jobLauncher.run(studentImportJob, jobParameters);
            log.info("Batch job completed with status: {}", jobExecution.getStatus());

            if (jobExecution.getStatus().isUnsuccessful()) {
                log.error("Batch job failed!");
                jobExecution.getAllFailureExceptions().forEach(ex ->
                        log.error("Failure: ", ex));
            } else {
                log.info("✅ Batch job completed successfully!");
            }

        } catch (Exception e) {
            log.error("❌ Error running batch job", e);
        }
    }

    private void printHelp() {
        log.info("Available commands:");
        log.info("  batch - Run student import batch job");
        log.info("  help  - Show this help message");
        log.info("  exit  - Shutdown the application");
    }
}