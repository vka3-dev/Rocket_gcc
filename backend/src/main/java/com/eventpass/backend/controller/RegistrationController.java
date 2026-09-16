package com.eventpass.backend.controller;

import com.eventpass.backend.entity.Registration;
import com.eventpass.backend.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {
    private final RegistrationService registrationService;

    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Registration register(@RequestBody Map<String, Long> request) {
        Long participantId = request.get("participantId");
        Long eventId = request.get("eventId");
        if (participantId == null || eventId == null) {
            throw new IllegalArgumentException("participantId and eventId are required");
        }
        return registrationService.register(participantId, eventId);
    }

    @GetMapping("/{registrationId}")
    public Registration getById(@PathVariable Long registrationId) {
        return registrationService.getById(registrationId);
    }

    @GetMapping("/participant/{participantId}")
    public List<Registration> getByParticipant(@PathVariable Long participantId) {
        return registrationService.getByParticipant(participantId);
    }

    @GetMapping("/event/{eventId}")
    public List<Registration> getByEvent(@PathVariable Long eventId) {
        return registrationService.getByEvent(eventId);
    }

    @PatchMapping("/{registrationId}/cancel")
    public Registration cancel(@PathVariable Long registrationId) {
        return registrationService.cancel(registrationId);
    }
}
