package com.eventpass.backend.service;

import com.eventpass.backend.entity.Event;
import com.eventpass.backend.entity.Session;
import com.eventpass.backend.repo.EventRepository;
import com.eventpass.backend.repo.SessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;
    private final EventRepository eventRepository;

    public SessionService(SessionRepository sessionRepository, EventRepository eventRepository) {
        this.sessionRepository = sessionRepository;
        this.eventRepository = eventRepository;
    }

    @Transactional
    public Session create(Long eventId, Session request) {
        Event event = getEvent(eventId);
        validateTime(request);
        request.setSessionId(null);
        request.setEvent(event);
        return sessionRepository.save(request);
    }

    @Transactional(readOnly = true)
    public List<Session> getByEvent(Long eventId) {
        getEvent(eventId);
        return sessionRepository.findByEventEventIdOrderByStartTimeAsc(eventId);
    }

    @Transactional(readOnly = true)
    public Session getById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Session not found: " + id));
    }

    @Transactional
    public Session update(Long id, Session request) {
        Session existing = getById(id);
        validateTime(request);
        existing.setSessionTitle(request.getSessionTitle());
        existing.setSessionDuration(request.getSessionDuration());
        existing.setStartTime(request.getStartTime());
        existing.setEndTime(request.getEndTime());
        return sessionRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        sessionRepository.delete(getById(id));
    }

    private void validateTime(Session session) {
        if (session.getStartTime() == null || session.getEndTime() == null) {
            throw new IllegalArgumentException("Session start and end time are required");
        }
        if (!session.getEndTime().isAfter(session.getStartTime())) {
            throw new IllegalArgumentException("Session end time must be after start time");
        }
        if (session.getSessionDuration() != null) {
            long actualMinutes = Duration.between(session.getStartTime(), session.getEndTime()).toMinutes();
            if (actualMinutes != session.getSessionDuration()) {
                throw new IllegalArgumentException("Session duration must match start and end time");
            }
        }
    }

    private Event getEvent(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found: " + eventId));
    }
}
