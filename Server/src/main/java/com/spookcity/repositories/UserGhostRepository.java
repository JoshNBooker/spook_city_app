package com.spookcity.repositories;

import com.spookcity.models.UserGhostRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserGhostRepository extends JpaRepository<UserGhostRelationship, Long> {
}
