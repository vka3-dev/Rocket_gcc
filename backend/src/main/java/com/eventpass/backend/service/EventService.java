package com.eventpass.backend.service;

import com.eventpass.backend.entity.*;
import com.eventpass.backend.repo.EventRepository;
import com.eventpass.backend.repo.EventRegistrationCount;
import com.eventpass.backend.repo.CheckInRepository;
import com.eventpass.backend.repo.RegistrationRepository;
import com.eventpass.backend.repo.UserRepository;
import com.eventpass.backend.repo.VenueRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final RegistrationRepository registrationRepository;
    private final CheckInRepository checkInRepository;

    public EventService(EventRepository eventRepository,
                        UserRepository userRepository,
                        VenueRepository venueRepository,
                        RegistrationRepository registrationRepository,
                        CheckInRepository checkInRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.venueRepository = venueRepository;
        this.registrationRepository = registrationRepository;
        this.checkInRepository = checkInRepository;
    }

    @Transactional
    public Event create(Event request) {
        validateDates(request);

        User organizer = resolveUser(request.getOrganizer());
        if (organizer.getRole() != UserRole.ORGANIZER) {
            throw new IllegalStateException("Only an organizer can create an event");
        }

        Venue venue = resolveVenue(request.getVenue());
        if (!Boolean.TRUE.equals(venue.getVenueAvailability())) {
            throw new IllegalStateException("Venue is not available");
        }

        request.setEventId(null);
        request.setOrganizer(organizer);
        request.setVenue(venue);
        request.setStatus(EventStatus.OPEN);
        request.setAvailabilityStatus(AvailabilityStatus.AVAILABLE);
        return eventRepository.save(request);
    }

    @Transactional(readOnly = true)
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Event getById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + id));
    }

    @Transactional(readOnly = true)
    public List<Event> getOpenEvents() {
        return eventRepository.findByStatus(EventStatus.OPEN);
    }

    @Transactional(readOnly = true)
    public List<Event> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizerUserId(organizerId);
    }


    @Transactional(readOnly = true)
    public List<EventRegistrationCount> getEventsByRegistrationCount() {
        return eventRepository.findEventsByRegistrationCount(RegistrationStatus.REGISTERED);
    }

    @Transactional(readOnly = true)
    public List<Event> getUpcomingEvents() {
        return eventRepository.findUpcomingOpenEvents(EventStatus.OPEN);
    }

    @Transactional
    public Event update(Long id, Event request) {
        Event existing = getById(id);
        validateDates(request);

        if (request.getOrganizer() != null && request.getOrganizer().getUserId() != null) {
            User organizer = resolveUser(request.getOrganizer());
            if (organizer.getRole() != UserRole.ORGANIZER) {
                throw new IllegalStateException("Event organizer must have ORGANIZER role");
            }
            existing.setOrganizer(organizer);
        }

        if (request.getVenue() != null && request.getVenue().getVenueId() != null) {
            existing.setVenue(resolveVenue(request.getVenue()));
        }

        existing.setEventName(request.getEventName());
        existing.setEventDateStart(request.getEventDateStart());
        existing.setEventDateEnd(request.getEventDateEnd());
        existing.setLastDateRegistration(request.getLastDateRegistration());
        if (request.getStatus() != null) {
            existing.setStatus(request.getStatus());
        }
        refreshAvailability(existing);
        return eventRepository.save(existing);
    }


    @Transactional(readOnly = true)
    public EventSummary getSummary(Long eventId) {
        Event event = getById(eventId);
        long registered = registrationRepository.countByEventEventIdAndRegistrationStatus(
                eventId, RegistrationStatus.REGISTERED);
        long checkedIn = checkInRepository.countByRegistrationEventEventIdAndCheckinStatus(
                eventId, CheckInStatus.CHECKED_IN);
        return new EventSummary(
                event.getEventId(),
                event.getEventName(),
                event.getVenue().getVenueCapacity(),
                registered,
                checkedIn
        );
    }

    @Transactional
    public void closeEvent(Long id) {
        Event event = getById(id);
        event.setStatus(EventStatus.CLOSED);
        eventRepository.save(event);
    }

    @Transactional
    public void delete(Long id) {
        eventRepository.delete(getById(id));
    }

    @Transactional
    public void refreshAvailability(Event event) {
        long registeredCount = registrationRepository.countByEventEventIdAndRegistrationStatus(
                event.getEventId(), RegistrationStatus.REGISTERED);
        int capacity = event.getVenue().getVenueCapacity();
        event.setAvailabilityStatus(registeredCount >= capacity
                ? AvailabilityStatus.FULL
                : AvailabilityStatus.AVAILABLE);
    }

    private void validateDates(Event event) {
        if (event.getEventDateStart() == null || event.getEventDateEnd() == null || event.getLastDateRegistration() == null) {
            throw new IllegalArgumentException("Event start date, end date and last registration date are required");
        }
        if (event.getEventDateEnd().isBefore(event.getEventDateStart())) {
            throw new IllegalArgumentException("Event end date cannot be before start date");
        }
        if (event.getLastDateRegistration().isAfter(event.getEventDateStart())) {
            throw new IllegalArgumentException("Last registration date cannot be after event start date");
        }
    }

    private User resolveUser(User reference) {
        if (reference == null || reference.getUserId() == null) {
            throw new IllegalArgumentException("A valid organizer userId is required");
        }
        return userRepository.findById(reference.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Organizer not found: " + reference.getUserId()));
    }

    private Venue resolveVenue(Venue reference) {
        if (reference == null || reference.getVenueId() == null) {
            throw new IllegalArgumentException("A valid venueId is required");
        }
        return venueRepository.findById(reference.getVenueId())
                .orElseThrow(() -> new IllegalArgumentException("Venue not found: " + reference.getVenueId()));
    }
}
