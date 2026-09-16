package com.eventpass.backend.controller;

import com.eventpass.backend.entity.Event;
import com.eventpass.backend.service.EventService;
import com.eventpass.backend.service.EventSummary;
import com.eventpass.backend.repo.EventRegistrationCount;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Event create(@Valid @RequestBody Event event) {
        return eventService.create(event);
    }

    @GetMapping
    public List<Event> getAll() {
        return eventService.getAll();
    }

    @GetMapping("/open")
    public List<Event> getOpenEvents() {
        return eventService.getOpenEvents();
    }


    @GetMapping("/registration-count")
    public List<EventRegistrationCount> getEventsByRegistrationCount() {
        return eventService.getEventsByRegistrationCount();
    }

    @GetMapping("/upcoming")
    public List<Event> getUpcomingEvents() {
        return eventService.getUpcomingEvents();
    }

    @GetMapping("/organizer/{organizerId}")
    public List<Event> getByOrganizer(@PathVariable Long organizerId) {
        return eventService.getEventsByOrganizer(organizerId);
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) {
        return eventService.getById(id);
    }

    @GetMapping("/{id}/summary")
    public EventSummary getSummary(@PathVariable Long id) {
        return eventService.getSummary(id);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @Valid @RequestBody Event event) {
        return eventService.update(id, event);
    }

    @PatchMapping("/{id}/close")
    public String close(@PathVariable Long id) {
        eventService.closeEvent(id);
        return "Event closed successfully";
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        eventService.delete(id);
    }
}
