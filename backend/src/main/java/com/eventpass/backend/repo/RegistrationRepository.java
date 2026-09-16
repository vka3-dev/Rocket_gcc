package com.eventpass.backend.repo;

import com.eventpass.backend.entity.Registration;
import com.eventpass.backend.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByParticipantUserIdAndEventEventId(Long participantId, Long eventId);
    List<Registration> findByParticipantUserIdOrderByRegisteredDateDesc(Long participantId);
    List<Registration> findByEventEventIdAndRegistrationStatus(Long eventId, RegistrationStatus status);

    long countByEventEventIdAndRegistrationStatus(Long eventId, RegistrationStatus status);

    @Query("select r from Registration r where r.event.eventId = :eventId and r.registrationStatus = :status")
    List<Registration> findActiveRegistrations(@Param("eventId") Long eventId, @Param("status") RegistrationStatus status);
}
