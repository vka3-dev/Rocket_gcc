package com.eventpass.backend.controller;

import com.eventpass.backend.entity.CheckIn;
import com.eventpass.backend.service.CheckInService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkins")
public class CheckInController {
    private final CheckInService checkInService;

    public CheckInController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @PostMapping("/{registrationId}")
    public CheckIn checkIn(@PathVariable Long registrationId) {
        return checkInService.checkIn(registrationId);
    }

    @GetMapping("/registration/{registrationId}")
    public CheckIn getByRegistration(@PathVariable Long registrationId) {
        return checkInService.getByRegistration(registrationId);
    }

    @GetMapping("/event/{eventId}/count")
    public long getCheckedInCount(@PathVariable Long eventId) {
        return checkInService.getCheckedInCount(eventId);
    }
}
