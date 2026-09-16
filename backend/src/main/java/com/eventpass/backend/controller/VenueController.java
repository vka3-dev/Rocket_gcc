package com.eventpass.backend.controller;

import com.eventpass.backend.entity.Venue;
import com.eventpass.backend.service.VenueService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
public class VenueController {
    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Venue create(@Valid @RequestBody Venue venue) {
        return venueService.create(venue);
    }

    @GetMapping
    public List<Venue> getAll() {
        return venueService.getAll();
    }

    @GetMapping("/{id}")
    public Venue getById(@PathVariable Long id) {
        return venueService.getById(id);
    }

    @PutMapping("/{id}")
    public Venue update(@PathVariable Long id, @Valid @RequestBody Venue venue) {
        return venueService.update(id, venue);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        venueService.delete(id);
    }
}
