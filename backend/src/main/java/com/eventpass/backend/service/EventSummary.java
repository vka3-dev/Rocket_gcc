package com.eventpass.backend.service;

public record EventSummary(
        Long eventId,
        String eventName,
        int capacity,
        long registeredCount,
        long checkedInCount
) {}
