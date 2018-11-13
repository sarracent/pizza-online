package com.softplan.app.repository;

import com.softplan.app.domain.PizzaCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PizzaCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PizzaCategoryRepository extends JpaRepository<PizzaCategory, Long> {

}
