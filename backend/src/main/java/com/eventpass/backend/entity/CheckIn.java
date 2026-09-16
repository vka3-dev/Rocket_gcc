package com.eventpass.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "checkin")
public class CheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkinId;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "registration_id", nullable = false, unique = true)
    @JsonIgnore
    private Registration registration;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CheckInStatus checkinStatus = CheckInStatus.NOT_CHECKED_IN;

    public Long getCheckinId() { return checkinId; }
    public void setCheckinId(Long checkinId) { this.checkinId = checkinId; }
    public Registration getRegistration() { return registration; }
    public void setRegistration(Registration registration) { this.registration = registration; }
    public CheckInStatus getCheckinStatus() { return checkinStatus; }
    public void setCheckinStatus(CheckInStatus checkinStatus) { this.checkinStatus = checkinStatus; }
}
