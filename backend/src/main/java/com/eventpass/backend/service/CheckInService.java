package com.eventpass.backend.service;

import com.eventpass.backend.entity.*;
import com.eventpass.backend.repo.CheckInRepository;
import com.eventpass.backend.repo.RegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class CheckInService {
    private final CheckInRepository checkInRepository;
    private final RegistrationRepository registrationRepository;

    public CheckInService(CheckInRepository checkInRepository, RegistrationRepository registrationRepository) {
        this.checkInRepository = checkInRepository;
        this.registrationRepository = registrationRepository;
    }

    @Transactional
    public CheckIn checkIn(Long registrationId) {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found: " + registrationId));

        if (registration.getRegistrationStatus() != RegistrationStatus.REGISTERED) {
            throw new IllegalStateException("Only registered participants can check in");
        }

        Event event = registration.getEvent();
        LocalDate today = LocalDate.now();
        if (today.isBefore(event.getEventDateStart()) || today.isAfter(event.getEventDateEnd())) {
            throw new IllegalStateException("Check-in is allowed only on the event day");
        }

        Optional<CheckIn> existing = checkInRepository.findByRegistrationRegistrationId(registrationId);
        if (existing.isPresent() && existing.get().getCheckinStatus() == CheckInStatus.CHECKED_IN) {
            throw new IllegalStateException("Participant is already checked in");
        }

        CheckIn checkIn = existing.orElseGet(CheckIn::new);
        checkIn.setRegistration(registration);
        checkIn.setCheckinStatus(CheckInStatus.CHECKED_IN);
        return checkInRepository.save(checkIn);
    }

    @Transactional(readOnly = true)
    public CheckIn getByRegistration(Long registrationId) {
        return checkInRepository.findByRegistrationRegistrationId(registrationId)
                .orElseThrow(() -> new IllegalArgumentException("Check-in record not found for registration: " + registrationId));
    }

    @Transactional(readOnly = true)
    public long getCheckedInCount(Long eventId) {
        return checkInRepository.countByRegistrationEventEventIdAndCheckinStatus(
                eventId, CheckInStatus.CHECKED_IN);
    }
}
