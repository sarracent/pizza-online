package com.softplan.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.softplan.app.domain.PizzaOrder;
import com.softplan.app.service.PizzaOrderService;
import com.softplan.app.web.rest.errors.BadRequestAlertException;
import com.softplan.app.web.rest.util.HeaderUtil;
import com.softplan.app.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PizzaOrder.
 */
@RestController
@RequestMapping("/api")
public class PizzaOrderResource {

    private final Logger log = LoggerFactory.getLogger(PizzaOrderResource.class);

    private static final String ENTITY_NAME = "pizzaOrder";

    private final PizzaOrderService pizzaOrderService;

    public PizzaOrderResource(PizzaOrderService pizzaOrderService) {
        this.pizzaOrderService = pizzaOrderService;
    }

    /**
     * POST  /pizza-orders : Create a new pizzaOrder.
     *
     * @param pizzaOrder the pizzaOrder to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pizzaOrder, or with status 400 (Bad Request) if the pizzaOrder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pizza-orders")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<PizzaOrder> createPizzaOrder(@Valid @RequestBody PizzaOrder pizzaOrder) throws URISyntaxException {
        log.debug("REST request to save PizzaOrder : {}", pizzaOrder);
        if (pizzaOrder.getId() != null) {
            throw new BadRequestAlertException("A new pizzaOrder cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PizzaOrder result = pizzaOrderService.save(pizzaOrder);
        return ResponseEntity.created(new URI("/api/pizza-orders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pizza-orders : Updates an existing pizzaOrder.
     *
     * @param pizzaOrder the pizzaOrder to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pizzaOrder,
     * or with status 400 (Bad Request) if the pizzaOrder is not valid,
     * or with status 500 (Internal Server Error) if the pizzaOrder couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pizza-orders")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<PizzaOrder> updatePizzaOrder(@Valid @RequestBody PizzaOrder pizzaOrder) throws URISyntaxException {
        log.debug("REST request to update PizzaOrder : {}", pizzaOrder);
        if (pizzaOrder.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PizzaOrder result = pizzaOrderService.save(pizzaOrder);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pizzaOrder.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pizza-orders : get all the pizzaOrders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of pizzaOrders in body
     */
    @GetMapping("/pizza-orders")
    @Timed
    public ResponseEntity<List<PizzaOrder>> getAllPizzaOrders(Pageable pageable) {
        log.debug("REST request to get a page of PizzaOrders");
        Page<PizzaOrder> page = pizzaOrderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pizza-orders");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /pizza-orders/:id : get the "id" pizzaOrder.
     *
     * @param id the id of the pizzaOrder to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pizzaOrder, or with status 404 (Not Found)
     */
    @GetMapping("/pizza-orders/{id}")
    @Timed
    public ResponseEntity<PizzaOrder> getPizzaOrder(@PathVariable Long id) {
        log.debug("REST request to get PizzaOrder : {}", id);
        Optional<PizzaOrder> pizzaOrder = pizzaOrderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pizzaOrder);
    }

    /**
     * DELETE  /pizza-orders/:id : delete the "id" pizzaOrder.
     *
     * @param id the id of the pizzaOrder to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pizza-orders/{id}")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deletePizzaOrder(@PathVariable Long id) {
        log.debug("REST request to delete PizzaOrder : {}", id);
        pizzaOrderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
