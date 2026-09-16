package com.eventpass.backend.controller;

import com.eventpass.backend.entity.Session;
import com.eventpass.backend.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/event/{eventId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Session create(@PathVariable Long eventId, @Valid @RequestBody Session session) {
        return sessionService.create(eventId, session);
    }

    @GetMapping("/event/{eventId}")
    public List<Session> getByEvent(@PathVariable Long eventId) {
        return sessionService.getByEvent(eventId);
    }

    @GetMapping("/{sessionId}")
    public Session getById(@PathVariable Long sessionId) {
        return sessionService.getById(sessionId);
    }

    @PutMapping("/{sessionId}")
    public Session update(@PathVariable Long sessionId, @Valid @RequestBody Session session) {
        return sessionService.update(sessionId, session);
    }

    @DeleteMapping("/{sessionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long sessionId) {
        sessionService.delete(sessionId);
    }
}
