package com.spookcity.repositories;

import com.spookcity.models.Ghost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GhostRepository extends JpaRepository<Ghost, Long> {
}
