package com.eventpass.backend.repo;

import com.eventpass.backend.entity.CheckIn;
import com.eventpass.backend.entity.CheckInStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
    Optional<CheckIn> findByRegistrationRegistrationId(Long registrationId);
    long countByRegistrationEventEventIdAndCheckinStatus(Long eventId, CheckInStatus status);
}
