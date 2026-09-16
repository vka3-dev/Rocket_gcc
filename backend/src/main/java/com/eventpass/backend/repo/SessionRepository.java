package com.eventpass.backend.repo;

import com.eventpass.backend.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByEventEventIdOrderByStartTimeAsc(Long eventId);
}
