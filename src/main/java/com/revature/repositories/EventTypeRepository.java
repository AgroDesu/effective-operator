package com.revature.repositories;

import org.springframework.data.repository.CrudRepository;

import com.revature.beans.EventType;

public interface EventTypeRepository extends CrudRepository<EventType, Long> {

}
