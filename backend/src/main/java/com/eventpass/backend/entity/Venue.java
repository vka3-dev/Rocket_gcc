package com.eventpass.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "venue")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long venueId;

    @NotBlank
    @Column(nullable = false)
    private String venueLocation;

    @Min(1)
    @Column(nullable = false)
    private Integer venueCapacity;

    @NotBlank
    @Column(nullable = false)
    private String venueType;

    @Column(nullable = false)
    private Boolean venueAvailability = true;

    @JsonIgnore
    @OneToMany(mappedBy = "venue")
    private List<Event> events = new ArrayList<>();

    public Long getVenueId() { return venueId; }
    public void setVenueId(Long venueId) { this.venueId = venueId; }
    public String getVenueLocation() { return venueLocation; }
    public void setVenueLocation(String venueLocation) { this.venueLocation = venueLocation; }
    public Integer getVenueCapacity() { return venueCapacity; }
    public void setVenueCapacity(Integer venueCapacity) { this.venueCapacity = venueCapacity; }
    public String getVenueType() { return venueType; }
    public void setVenueType(String venueType) { this.venueType = venueType; }
    public Boolean getVenueAvailability() { return venueAvailability; }
    public void setVenueAvailability(Boolean venueAvailability) { this.venueAvailability = venueAvailability; }
    public List<Event> getEvents() { return events; }
}
