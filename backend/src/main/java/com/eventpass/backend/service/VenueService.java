package com.eventpass.backend.service;

import com.eventpass.backend.entity.Venue;
import com.eventpass.backend.repo.VenueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VenueService {
    private final VenueRepository venueRepository;

    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    @Transactional
    public Venue create(Venue venue) {
        venue.setVenueId(null);
        if (venue.getVenueAvailability() == null) {
            venue.setVenueAvailability(true);
        }
        return venueRepository.save(venue);
    }

    @Transactional(readOnly = true)
    public List<Venue> getAll() {
        return venueRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Venue getById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venue not found: " + id));
    }

    @Transactional
    public Venue update(Long id, Venue request) {
        Venue existing = getById(id);
        existing.setVenueLocation(request.getVenueLocation());
        existing.setVenueCapacity(request.getVenueCapacity());
        existing.setVenueType(request.getVenueType());
        if (request.getVenueAvailability() != null) {
            existing.setVenueAvailability(request.getVenueAvailability());
        }
        return venueRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        venueRepository.delete(getById(id));
    }
}
