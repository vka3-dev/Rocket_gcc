package com.eventpass.backend.service;

import com.eventpass.backend.entity.*;
import com.eventpass.backend.repo.EventRepository;
import com.eventpass.backend.repo.RegistrationRepository;
import com.eventpass.backend.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {
    private final RegistrationRepository registrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventService eventService;

    public RegistrationService(RegistrationRepository registrationRepository,
                               UserRepository userRepository,
                               EventRepository eventRepository,
                               EventService eventService) {
        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.eventService = eventService;
    }

    @Transactional
    public Registration register(Long participantId, Long eventId) {
        User participant = userRepository.findById(participantId)
                .orElseThrow(() -> new IllegalArgumentException("Participant not found: " + participantId));
        if (participant.getRole() != UserRole.PARTICIPANT && participant.getRole() != UserRole.ORGANIZER) {
            throw new IllegalStateException("User role is not allowed to register");
        }

        Event event = eventRepository.findLockedByEventId(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + eventId));

        if (event.getOrganizer().getUserId().equals(participantId)) {
            throw new IllegalStateException("An organizer cannot register for their own event");
        }

        LocalDate today = LocalDate.now();
        if (event.getStatus() != EventStatus.OPEN) {
            throw new IllegalStateException("Registration is closed for this event");
        }
        if (today.isAfter(event.getLastDateRegistration())) {
            throw new IllegalStateException("Registration deadline has passed");
        }
        if (today.isAfter(event.getEventDateEnd())) {
            throw new IllegalStateException("Event has already ended");
        }

        Registration existing = registrationRepository
                .findByParticipantUserIdAndEventEventId(participantId, eventId)
                .orElse(null);

        if (existing != null && existing.getRegistrationStatus() == RegistrationStatus.REGISTERED) {
            throw new IllegalStateException("Participant is already registered for this event");
        }

        long activeRegistrations = registrationRepository.countByEventEventIdAndRegistrationStatus(
                eventId, RegistrationStatus.REGISTERED);
        if (activeRegistrations >= event.getVenue().getVenueCapacity()) {
            event.setAvailabilityStatus(AvailabilityStatus.FULL);
            eventRepository.save(event);
            throw new IllegalStateException("Event capacity is full");
        }

        Registration registration = existing != null ? existing : new Registration();
        registration.setParticipant(participant);
        registration.setEvent(event);
        registration.setRegisteredDate(LocalDate.now());
        registration.setRegistrationStatus(RegistrationStatus.REGISTERED);
        Registration saved = registrationRepository.save(registration);

        eventService.refreshAvailability(event);
        eventRepository.save(event);
        return saved;
    }

    @Transactional(readOnly = true)
    public Registration getById(Long registrationId) {
        return registrationRepository.findById(registrationId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found: " + registrationId));
    }

    @Transactional(readOnly = true)
    public List<Registration> getByParticipant(Long participantId) {
        userRepository.findById(participantId)
                .orElseThrow(() -> new IllegalArgumentException("Participant not found: " + participantId));
        return registrationRepository.findByParticipantUserIdOrderByRegisteredDateDesc(participantId);
    }

    @Transactional(readOnly = true)
    public List<Registration> getByEvent(Long eventId) {
        eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + eventId));
        return registrationRepository.findByEventEventIdAndRegistrationStatus(eventId, RegistrationStatus.REGISTERED);
    }

    @Transactional
    public Registration cancel(Long registrationId) {
        Registration registration = getById(registrationId);
        if (registration.getRegistrationStatus() == RegistrationStatus.CANCELLED) {
            throw new IllegalStateException("Registration is already cancelled");
        }

        LocalDate today = LocalDate.now();
        Event event = registration.getEvent();
        if (!today.isBefore(event.getEventDateStart())) {
            throw new IllegalStateException("Registration cannot be cancelled after the event has started");
        }

        registration.setRegistrationStatus(RegistrationStatus.CANCELLED);
        Registration saved = registrationRepository.save(registration);
        eventService.refreshAvailability(event);
        eventRepository.save(event);
        return saved;
    }
}
