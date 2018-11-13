package com.softplan.app.repository;

import com.softplan.app.domain.PizzaOrder;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PizzaOrder entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PizzaOrderRepository extends JpaRepository<PizzaOrder, Long> {
	Page<PizzaOrder> findAllByCustomerUserLogin(String login, Pageable pageable);
	Optional<PizzaOrder> findOneByIdAndCustomerUserLogin(Long id, String login);
}
