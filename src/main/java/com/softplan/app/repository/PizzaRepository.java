package com.softplan.app.repository;

import com.softplan.app.domain.Pizza;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Pizza entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {

}
