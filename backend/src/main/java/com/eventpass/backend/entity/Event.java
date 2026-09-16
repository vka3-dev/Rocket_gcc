package com.eventpass.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @NotBlank
    @Column(nullable = false)
    private String eventName;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @NotNull
    @Column(nullable = false)
    private LocalDate eventDateStart;

    @NotNull
    @Column(nullable = false)
    private LocalDate eventDateEnd;

    @NotNull
    @Column(name = "last_date_reg", nullable = false)
    private LocalDate lastDateRegistration;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status = EventStatus.OPEN;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AvailabilityStatus availabilityStatus = AvailabilityStatus.AVAILABLE;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "organizer_id", nullable = false)
    private User organizer;

    @JsonIgnore
    @OneToMany(
        mappedBy = "event",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<Session> sessions = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    private List<Registration> registrations = new ArrayList<>();

    // Getters and Setters

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public LocalDate getEventDateStart() {
        return eventDateStart;
    }

    public void setEventDateStart(LocalDate eventDateStart) {
        this.eventDateStart = eventDateStart;
    }

    public LocalDate getEventDateEnd() {
        return eventDateEnd;
    }

    public void setEventDateEnd(LocalDate eventDateEnd) {
        this.eventDateEnd = eventDateEnd;
    }

    public LocalDate getLastDateRegistration() {
        return lastDateRegistration;
    }

    public void setLastDateRegistration(LocalDate lastDateRegistration) {
        this.lastDateRegistration = lastDateRegistration;
    }

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public AvailabilityStatus getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(AvailabilityStatus availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public User getOrganizer() {
        return organizer;
    }

    public void setOrganizer(User organizer) {
        this.organizer = organizer;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public List<Registration> getRegistrations() {
        return registrations;
    }
}