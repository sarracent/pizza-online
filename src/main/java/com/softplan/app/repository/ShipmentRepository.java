package com.softplan.app.repository;

import com.softplan.app.domain.PizzaOrder;
import com.softplan.app.domain.Shipment;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Shipment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
	Page<Shipment> findAllByInvoiceOrderCustomerUserLogin(String login, Pageable pageable);
	Optional<Shipment> findOneByIdAndInvoiceOrderCustomerUserLogin(Long id, String login);

}
