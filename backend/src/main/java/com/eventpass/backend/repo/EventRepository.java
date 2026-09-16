package com.eventpass.backend.repo;

import com.eventpass.backend.entity.Event;
import com.eventpass.backend.entity.EventStatus;
import com.eventpass.backend.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    java.util.Optional<Event> findLockedByEventId(Long eventId);

    List<Event> findByStatus(EventStatus status);
    List<Event> findByOrganizerUserId(Long organizerId);

    @Query("select e.eventName as eventName, count(r) as totalRegistrations " +
           "from Event e left join e.registrations r on r.registrationStatus = :status " +
           "group by e.eventId, e.eventName order by count(r) desc")
    List<EventRegistrationCount> findEventsByRegistrationCount(@Param("status") RegistrationStatus status);

    @Query("select e from Event e where e.status = :status and e.eventDateStart >= CURRENT_DATE order by e.eventDateStart asc")
    List<Event> findUpcomingOpenEvents(@Param("status") EventStatus status);
}
